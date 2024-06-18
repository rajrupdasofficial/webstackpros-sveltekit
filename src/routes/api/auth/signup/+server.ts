import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Client, Databases, Query } from 'appwrite';
import { env } from '$env/dynamic/private';
import argon2 from 'argon2';
// import { jwt } from 'jsonwebtoken';

const appwriteendpoint = env.APPWRITE_IO;
const appwriteprojectid = env.APPWRITE_PROJECT_ID;
const appwritedbid = env.APPWRITE_DB_ID;
const appwriteusercolid = env.USER_COL_ID;

const client = new Client().setEndpoint(`${appwriteendpoint}`).setProject(`${appwriteprojectid}`);

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const frompassword = formData.get('password');
		const hashpassword = await argon2.hash(frompassword);
		const databases = new Databases(client);
		const existingUser = await databases.listDocuments(appwritedbid, appwriteusercolid, [
			Query.equal('email', formData.get('email') as string)
		]);

		if (existingUser.total > 0) {
			return json({ message: 'User with the email is already exists' }, { status: 409 });
		} else {
			await databases.createDocument(appwritedbid, appwriteusercolid, crypto.randomUUID(), {
				firstname: formData.get('firstname'),
				lastname: formData.get('lastname'),
				email: formData.get('email'),
				password: hashpassword,
				isadmin: false
			});
		}
		return json({ message: 'User data saves successfully' }, { status: 200 });
	} catch (error) {
		console.log(error);
		return json({ message: 'Error occurred while signing up' }, { status: 500 });
	}
};
