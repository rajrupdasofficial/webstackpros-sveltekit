import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async (event) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	if (cookies === null || cookies === undefined) {
		return new Response(null, {
			status: 404,
			statusText: 'Now JWT value hasbeen provded'
		});
	}
	const { token, refresh_token } = cookies;
	const secretkey = env.SECRET_KEY;

	if (!refresh_token && !token) {
		return new Response(null, { status: 401, statusText: 'Unauthorized user' });
	}

	try {
		if (token !== null) {
			const user = jwt.verify(token, secretkey) as Record<string, string>;
			return new Response(null, {
				status: 200,
				headers: {
					'User-status': JSON.stringify(user)
				}
			});
		} else {
			return new Response(null, {
				status: 403,
				statusText: 'No jwt token value hasbeen provided'
			});
		}
	} catch (error) {
		console.log(error);
		return new Response(null, {
			status: 500
		});
	}
};
