import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { Client, Databases } from 'appwrite';
import { env } from '$env/dynamic/private';
import { uploadImageToFirebase } from '@/firebase/firebasefileupload';

const appwriteendpoint = env.APPWRITE_IO;
const appwriteprojectid = env.APPWRITE_PROJECT_ID;
const appwritedbid = env.APPWRITE_DB_ID;
const slidercolid = env.SLIDER_COL_ID;

const client = new Client().setEndpoint(`${appwriteendpoint}`).setProject(`${appwriteprojectid}`);

export const POST: RequestHandler = async ({ request }) => {
	try {
		const filedata = await request.formData();
		const file = filedata.get('file') as File;

		if (!file) {
			return new Response(null, {
				status: 400,
				statusText: 'No file provided'
			});
		}

		const databases = new Databases(client);

		const uniqueFilename = `${crypto.randomUUID()}.${file.name.split('.').pop()}`;
		const filesize = file.size.toString();
		const lastModified = file.lastModified.toString();

		const firebase_storage_file_upload = await uploadImageToFirebase(file, uniqueFilename);

		await databases.createDocument(appwritedbid, slidercolid, crypto.randomUUID(), {
			filedata: uniqueFilename,
			filesize: filesize,
			lastmodified: lastModified
		});

		return new Response(null, {
			status: 200,
			statusText: 'File has been uploaded'
		});
	} catch (error) {
		console.log(error);
		return new Response(null, {
			status: 500,
			statusText: 'Something went wrong with the server'
		});
	}
};
