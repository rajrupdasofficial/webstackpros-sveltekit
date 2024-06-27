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
		const files = Array.from(filedata.values());
		console.log(files);
		console.log(filedata);
		const batchSize = 10;

		await files.reduce(async (prevPromise, file, index) => {
			await prevPromise;

			if (index % batchSize === 0) {
				await Promise.all(
					files.slice(index, index + batchSize).map(async (file) => {
						let uniqueFilename;
						if (typeof file === 'string') {
							uniqueFilename = `${crypto.randomUUID()}.${file.split('.').pop()}`;
							console.log(uniqueFilename);
						} else if (file instanceof Blob) {
							uniqueFilename = `${crypto.randomUUID()}.${file.name.split('.').pop()}`;
							console.log('elseif', uniqueFilename);
							const firebase_storage_file_upload = await uploadImageToFirebase(
								file,
								uniqueFilename
							);
							console.log(firebase_storage_file_upload);
						} else {
							throw new Error('Unsupported file type');
						}
					})
				);
			}
		}, Promise.resolve());

		return new Response(null, {
			status: 200,
			statusText: 'Files have been uploaded'
		});
	} catch (error) {
		console.log(error);
		return new Response(null, {
			status: 500,
			statusText: 'Something went wrong with the server'
		});
	}
};
