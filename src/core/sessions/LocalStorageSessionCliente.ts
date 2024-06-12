import { ClienteResponse } from '@/modules/pages/login/domain';

const defaultClienteResponse: ClienteResponse = {
	id: 0,
	nombres: '',
	apellidos: '',
	fechaNacimiento: '',
	telefono: null,
	nimagen: null,
	correo: '',
	contrasena: '',
	estado: false,
};

const STORAGE_OF_AUTHORIZATION = 'STORAGE_OF_AUTHORIZATION_CLIENTE';

export const saveAuthorization = (payload: ClienteResponse): void => {
	localStorage.setItem(STORAGE_OF_AUTHORIZATION, JSON.stringify(payload));
};

export const getAuthorization = (): ClienteResponse => {
	const data = localStorage.getItem(STORAGE_OF_AUTHORIZATION);
	if (data == null) {
		return defaultClienteResponse;
	}
	return JSON.parse(data);
};

export const removeAuthorization = (): void => {
	localStorage.removeItem(STORAGE_OF_AUTHORIZATION);
};

export const existsAuthorization = (): boolean => {
	const data = localStorage.getItem(STORAGE_OF_AUTHORIZATION);
	if (data != null) return true;
	return false;
};
