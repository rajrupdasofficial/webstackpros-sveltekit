import type { RequestHandler } from './$types';
import { Client, Databases } from 'appwrite';
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import { DigitalOcean } from 'digitalocean-js';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
// Environment Configuration
const appwriteendpoint = env.APPWRITE_IO;
const appwriteprojectid = env.APPWRITE_PROJECT_ID;
const appwritedbid = env.APPWRITE_DB_ID;
const digitaloceandbid = env.DIGITAL_OCEAN_DB_ID;
const digitaloceanopskey = env.DIGITALOCEAN_API_KEY;

// Initialize Appwrite Client
const client = new Client().setEndpoint(`${appwriteendpoint}`).setProject(`${appwriteprojectid}`);

// Initialize DigitalOcean Client
const digitalocean = new DigitalOcean(`${digitaloceanopskey}`);

export const POST: RequestHandler = async ({ request }) => {
	try {
		// Parse Form Data
		const cookies = cookie.parse(request.headers.get('cookie') || '');
		const jwttoken = cookies['intercom'];
		const decodedtoken = jwt.decode(jwttoken);
		const useruid = decodedtoken.userid;
		const formData = await request.formData();

		// Extract Droplet Details
		const dropletname = formData.get('dropletname') as string;
		const dropletregion = formData.get('dropletregion') as string;
		const dropletsize = formData.get('dropletsize') as string;
		const dropletimage = formData.get('dropletimage') as string;
		const dropletsshkey = formData.get('dropletsshkey') as string;
		// SSH Key Creation
		let sshkey;
		try {
			sshkey = await digitalocean.ssh.createNewKey({
				name: `${useruid}-dropletsshkey`,
				public_key: dropletsshkey
			});
		} catch (sshKeyError) {
			console.error('SSH Key Creation Error:', sshKeyError);
			throw new Error('Failed to create SSH key');
		}

		// Droplet Creation
		let droplets;
		try {
			droplets = await digitalocean.droplets.createNewDroplet({
				name: dropletname,
				region: dropletregion,
				size: dropletsize,
				image: dropletimage,
				ssh_keys: [sshkey.id],
				user_data: useruid,
				backups: false
			});
		} catch (dropletError) {
			console.error('Droplet Creation Error:', dropletError);
			throw new Error('Failed to create droplet');
		}

		// Wait for Droplet to be Ready (Optional but Recommended)
		await new Promise((resolve) => setTimeout(resolve, 60000)); // 1 minute wait

		// Retrieve Droplet Details with Network Information
		let dropletDetails;
		let ipAddress = 'Pending';
		try {
			dropletDetails = await digitalocean.droplets.getExistingDroplet(droplets.id);

			// Find Public IPv4 Address
			const publicNetwork = dropletDetails.networks?.v4.find(
				(network) => network.type === 'public'
			);

			ipAddress = publicNetwork ? publicNetwork.ip_address : 'Not Available';
		} catch (networkError) {
			console.error('Could not retrieve droplet network details:', networkError);
		}
		console.log(droplets.id);
		console.log(sshkey.id);
		// Appwrite Database Storage
		const databases = new Databases(client);
		await databases.createDocument(`${appwritedbid}`, `${digitaloceandbid}`, crypto.randomUUID(), {
			userid: useruid,
			dropletname: dropletname,
			dropletregion: dropletregion,
			dropletsize: dropletsize,
			dropletsshkey: dropletsshkey,
			dropletid: String(droplets.id),
			dropletsshkeyid: String(sshkey.id),
			ipaddress: String(ipAddress),
			dropletimage: dropletimage,
			dropletbackup: false
		});

		// Success Response
		return json(
			{
				message: 'DigitalOcean droplet initialized successfully',
				ipAddress: ipAddress
			},
			{ status: 201 }
		);
	} catch (error) {
		// Global Error Handling
		console.error('Cloud Automation Process Error:', error);

		return json(
			{
				error: error instanceof Error ? error.message : 'Unexpected error occurred',
				details: error
			},
			{ status: 500 }
		);
	}
};
