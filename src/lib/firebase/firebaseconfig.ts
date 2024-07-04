import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// import { getFirestore } from 'firebase/firestore';
import { env } from '$env/dynamic/private';
// Your web app's Firebase configuration
const apiKey = env.apiKey;
const authDomain = env.authDomain;
const projectId = env.projectId;
const storageBucket = env.storageBucket;
const messagingSenderId = env.messagingSenderId;
const appId = env.appId;
const measurementId = env.measurementId;

const firebaseConfig = {
	apiKey: apiKey,
	authDomain: authDomain,
	projectId: projectId,
	storageBucket: storageBucket,
	messagingSenderId: messagingSenderId,
	appId: appId,
	measurementId: measurementId
};

// Initialize Firebase
export const firebase_cofig = initializeApp(firebaseConfig);

// Initialize Analytics

// if (typeof window !== 'undefined') {
//   co	analytics = getAnalytics(app);
// }
