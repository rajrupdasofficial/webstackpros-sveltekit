import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async (event) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	// console.log(cookies);
	// const jwttoken = cookies['intercom'];
	// console.log(jwttoken);
	// const decodedtoken = jwt.decode(jwttoken);
	// const userid = decodedtoken.userid;
	// console.log(userid);

	if (cookies === null || cookies === undefined) {
		return new Response(null, {
			status: 404,
			statusText: 'Now JWT value hasbeen provded'
		});
	}
	const { intercom, refresh_token } = cookies;
	// const userdetails = jwt.decode(intercom);
	// console.log(userdetails.userid);
	const secretkey = env.SECRET_KEY;

	if (!refresh_token && !intercom) {
		return new Response(null, { status: 401, statusText: 'Unauthorized user' });
	}

	try {
		if (intercom !== null) {
			const user = jwt.verify(intercom, secretkey) as Record<string, string>;
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
