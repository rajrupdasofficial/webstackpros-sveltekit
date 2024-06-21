import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { Client, Databases } from 'appwrite';
import { env } from '$env/dynamic/private';

const appwriteendpoint = env.APPWRITE_IO;

const appwriteprojectid = env.APPWRITE_PROJECT_ID;
const appwritedbid = env.APPWRITE_DB_ID;
const contactcollectionid = env.CONTACT_COL_ID;

const client = new Client().setEndpoint(`${appwriteendpoint}`).setProject(`${appwriteprojectid}`);

export const GET: RequestHandler = async () => {
	try {
		const databases = new Databases(client);
		const result = await databases.listDocuments(`${appwritedbid}`, `${contactcollectionid}`);

		return new Response(null, {
			status: 200,
			headers: {
				'all-contacts': JSON.stringify(result.documents)
			}
		});
	} catch (error) {
		console.log(error);
		return new Response(null, {
			status: 500,
			statusText: 'Error occurred at server side'
		});
	}
};
