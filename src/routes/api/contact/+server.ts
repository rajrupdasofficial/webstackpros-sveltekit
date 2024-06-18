import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Client, Databases } from 'appwrite';
import { env } from '$env/dynamic/private';

const appwriteendpoint = env.APPWRITE_IO;

const appwriteprojectid = env.APPWRITE_PROJECT_ID;
const appwritedbid = env.APPWRITE_DB_ID;
const contactcollectionid = env.CONTACT_COL_ID;

const client = new Client().setEndpoint(`${appwriteendpoint}`).setProject(`${appwriteprojectid}`);

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const databases = new Databases(client);
		await databases.createDocument(
			`${appwritedbid}`,
			`${contactcollectionid}`,
			crypto.randomUUID(),
			{
				name: formData.get('username'),
				email: formData.get('email'),
				phone: formData.get('phone'),
				message: formData.get('message')
			}
		);
		return json({ message: 'Form data saved successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error processing form data:', error);
		return json({ error: 'Error processing form data' }, { status: 500 });
	}
};
