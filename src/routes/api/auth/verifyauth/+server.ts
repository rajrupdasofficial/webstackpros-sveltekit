import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async (event) => {
	const { token, refresh_token } = cookie.parse(event.request.headers.get('cookie') || '');
	const secretkey = env.SECRET_KEY;
	if (!refresh_token) return new Response(null, { status: 401, statusText: 'Unauthorized user' });

	try {
		const user = jwt.verify(token, secretkey) as Record<string, string>;
		return new Response(null, {
			status: 200,
			headers: {
				'User-status': 'user=' + JSON.stringify(user)
			}
		});
	} catch (error) {
		console.log(error);
		return new Response(null, {
			status: 500
		});
	}
};
