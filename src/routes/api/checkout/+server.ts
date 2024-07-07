import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// You should store these in environment variables
const PAYPAL_CLIENT_ID = env.VITE_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = env.VITE_PAYPAL_CLIENT_SECRET;
const PAYPAL_API_BASE = 'https://api-m.sandbox.paypal.com'; // Use 'https://api-m.paypal.com' for production

interface PaymentDetails {
	currency: string;
	amount: string;
	orderID: string;
	payerID: string;
	paymentID: string;
	billingToken?: string;
	facilitatorAccessToken: string;
}

export const POST: RequestHandler = async ({ request }) => {
	const { paymentDetails }: { paymentDetails: PaymentDetails } = await request.json();

	try {
		const verified = await verifyPaymentWithPayPal(paymentDetails);
		if (verified) {
			await updateDatabase(paymentDetails);
			return json({ success: true, message: 'Payment processed successfully' });
		} else {
			return json({ success: false, message: 'Payment verification failed' }, { status: 400 });
		}
	} catch (error) {
		console.error('Error processing payment:', error);
		return json(
			{ success: false, message: 'An error occurred while processing the payment' },
			{ status: 500 }
		);
	}
};

async function getAccessToken(): Promise<string> {
	const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
		method: 'POST',
		body: 'grant_type=client_credentials',
		headers: {
			Authorization: `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')}`
		}
	});

	const data = await response.json();
	return data.access_token;
}

async function verifyPaymentWithPayPal(paymentDetails: PaymentDetails): Promise<boolean> {
	const accessToken = await getAccessToken();

	const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${paymentDetails.orderID}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	const order = await response.json();

	// Verify the important details of the order
	if (
		order.status === 'COMPLETED' &&
		order.purchase_units[0].amount.value === paymentDetails.amount &&
		order.purchase_units[0].amount.currency_code === paymentDetails.currency
	) {
		return true;
	}

	return false;
}

async function updateDatabase(paymentDetails: PaymentDetails): Promise<void> {
	// This is where you would implement your database update logic
	// For example, using Prisma ORM:

	// import { PrismaClient } from '@prisma/client'
	// const prisma = new PrismaClient()

	// await prisma.payment.create({
	//   data: {
	//     orderId: paymentDetails.orderID,
	//     payerId: paymentDetails.payerID,
	//     paymentId: paymentDetails.paymentID,
	//     amount: paymentDetails.amount,
	//     currency: paymentDetails.currency,
	//     status: 'completed',
	//   },
	// });

	console.log('Updating database with payment details:', paymentDetails);
}
