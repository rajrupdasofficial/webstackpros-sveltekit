import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		console.log('Saving form data to the database:', {
			name: formData.get('username'),
			email: formData.get('email'),
			phone: formData.get('phone'),
			message: formData.get('message')
		});
		return json({ message: 'Form data saved successfully' });
	} catch (error) {
		console.error('Error processing form data:', error);
		return json({ error: 'Error processing form data' }, { status: 500 });
	}
};
