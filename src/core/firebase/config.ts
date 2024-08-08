import { initializeApp } from 'firebase/app';
import {
	deleteObject,
	getDownloadURL,
	getMetadata,
	getStorage,
	ref,
	uploadBytes,
} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyB2x2H1-KsS-r-6_v4xxSKpb3mfrFi93XQ',
	authDomain: 'fir-storage-b3b29.firebaseapp.com',
	projectId: 'fir-storage-b3b29',
	storageBucket: 'fir-storage-b3b29.appspot.com',
	messagingSenderId: '957254379220',
	appId: '1:957254379220:web:1e89ce2fc5077428f33d41',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

/*export function uploadImage(file: File, name: string, carpeta: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const storageref = ref(storage, `${carpeta}/${name}`);
		uploadBytes(storageref, file)
			.then(response => {
				console.log(response);
				resolve(); // Resolvemos la promesa si la carga es exitosa
			})
			.catch(error => {
				console.error(error);
				reject(error); // Rechazamos la promesa si hay un error
			});
	});
}*/
export async function uploadImage(file: File, name: string, carpeta: string): Promise<void> {
	const storageref = ref(storage, `${carpeta}/${name}`);
	try {
		const response = await uploadBytes(storageref, file);
		console.log(response);
	} catch (error) {
		console.error(error);
		throw error; // Lanza el error para que el llamador pueda manejarlo
	}
}

export const getPhoto = async (name: string, carpeta: string): Promise<string> => {
	try {
		const imagesRef = ref(storage, `${carpeta}/${name}`);
		const url = await getDownloadURL(imagesRef);

		return url;
	} catch (error) {
		console.error('Error al obtener la URL de la imagen>>:', error);
		throw error; // Propagar el error para manejarlo externamente si es necesario
	}
};

export function updateImage(file: File, name: string, carpeta: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const storageref = ref(storage, `${carpeta}/${name}`);

		// Verificar si el archivo existe antes de subirlo
		getMetadata(storageref)
			.then(metadata => {
				// Si el archivo existe, lo borramos antes de subir el nuevo
				deleteObject(storageref)
					.then(() => {
						// Subir el nuevo archivo
						uploadBytes(storageref, file)
							.then(response => {
								console.log(response);
								resolve(); // Resolvemos la promesa si la carga es exitosa
							})
							.catch(error => {
								console.error(error);
								reject(error); // Rechazamos la promesa si hay un error
							});
					})
					.catch(error => {
						console.error('Error al borrar el archivo existente:', error);
						reject(error);
					});
			})
			.catch(error => {
				// Si hay un error al obtener los metadatos
				console.error('El archivo no existe o no se pudo obtener los metadatos:', error);
			});
	});
}
