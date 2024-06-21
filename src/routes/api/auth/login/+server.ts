import type { RequestHandler } from './$types';
import { Client, Databases, Query } from 'appwrite';
import { env } from '$env/dynamic/private';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const appwriteendpoint = env.APPWRITE_IO;
const appwriteprojectid = env.APPWRITE_PROJECT_ID;
const appwritedbid = env.APPWRITE_DB_ID;
const appwriteusercolid = env.USER_COL_ID;

const client = new Client().setEndpoint(`${appwriteendpoint}`).setProject(`${appwriteprojectid}`);

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const databases = new Databases(client);
		const checkuser = await databases.listDocuments(appwritedbid, appwriteusercolid, [
			Query.equal('email', formData.get('email') as string)
		]);
		if (checkuser.total == 0) {
			return new Response(null, { status: 404 });
		}
		const userDocument = checkuser.documents[0];
		const storedPassword = userDocument.password;
		const isPasswordValid = await argon2.verify(storedPassword, formData.get('password') as string);

		if (!isPasswordValid) {
			return new Response(null, { status: 401 });
		}
		const userid = userDocument.$id;
		const isadmin = userDocument.isadmin;
		const useremail = userDocument.email;
		const secretkey = env.SECRET_KEY;
		const secure = 'Secure';
		const refresh_token = crypto.randomUUID();
		const userinformation = {
			userid,
			isadmin,
			useremail
		};

		const token = jwt.sign(userinformation, secretkey, { expiresIn: `${1440 * 60 * 1000}` });
		if (isadmin === true) {
			return new Response(null, {
				status: 301,
				headers: {
					'set-cookie': [
						`refresh_token=${refresh_token};Max-Age=${30 * 24 * 60 * 60};Path=/;${secure} HttpOnly`,
						`token=${token};Max-Age=${15 * 60};Path=/;${secure} HttpOnly`
					].join(', ')
				}
			});
		}
		return new Response(null, {
			status: 200,
			headers: {
				'set-cookie': [
					`refresh_token=${refresh_token};Max-Age=${30 * 24 * 60 * 60};Path=/;${secure} HttpOnly`,
					`token=${token};Max-Age=${15 * 60};Path=/;${secure} HttpOnly`
				].join(', ')
			}
		});
	} catch (error) {
		console.log(error);
		return new Response(null, { status: 500, statusText: `Error occurred ${error}` });
	}
};
