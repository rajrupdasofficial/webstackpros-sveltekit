import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { firebase_cofig } from './firebaseconfig';

export const uploadImageToFirebase = async (imageData, uniqueFilename) => {
	try {
		const storage = getStorage(firebase_cofig);
		const storageRef = ref(storage, `${uniqueFilename}`);
		console.log('storageref', storageRef);
		await uploadBytes(storageRef, imageData);
		console.log('######  file successfully uploaded to firebase');
	} catch (error) {
		console.log('Error uploading image to firebase storage ', error);
		throw error;
	}
};
