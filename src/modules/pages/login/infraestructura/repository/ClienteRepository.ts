import axios, { AxiosResponse } from 'axios';
import { ClienteFilter, ClienteLogin, ClienteRequest, ClienteResponse } from '../../domain';
import { API_BASE_URL } from '@/core/constantes/env';
import { PaginationRequest, PaginationResponse } from '@/modules/shared/domain';
import { stringify } from 'qs';
import { getPhoto } from '@/core/firebase/config';
import { dateStringToDate, formatDate } from '@/core/helpers/DayjsHelper';

export const login = async (login: ClienteLogin): Promise<ClienteResponse> => {
	const response: AxiosResponse<ClienteResponse> = await axios.post(
		`${API_BASE_URL}/api/cliente/login`,
		login,
	);

	return response.data;
};

export const create = async (cliente: ClienteRequest): Promise<ClienteResponse> => {
	const response: AxiosResponse<ClienteResponse> = await axios.post(
		`${API_BASE_URL}/api/cliente`,
		cliente,
	);

	return response.data;
};

export const update = async (id: number, cliente: ClienteRequest): Promise<ClienteResponse> => {
	const response: AxiosResponse<ClienteResponse> = await axios.put(
		`${API_BASE_URL}/api/cliente/${id}`,
		cliente,
	);

	return response.data;
};

export const deleteById = async (id: number): Promise<ClienteResponse> => {
	const response: AxiosResponse<ClienteResponse> = await axios.delete(
		`${API_BASE_URL}/api/cliente/${id}`,
	);

	return response.data;
};

export const findById = async (id: number): Promise<ClienteResponse> => {
	const response: AxiosResponse<ClienteResponse> = await axios.get(
		`${API_BASE_URL}/api/cliente/${id}`,
	);

	return response.data;
};

export const paginatedSearch = async (
	paginationRequest: PaginationRequest<ClienteFilter>,
): Promise<PaginationResponse<ClienteResponse>> => {
	const paramsString: string = stringify(paginationRequest, {
		allowDots: true,
	});

	const response: AxiosResponse<PaginationResponse<ClienteResponse>> = await axios.get(
		`${API_BASE_URL}/api/cliente/busquedapaginada?${paramsString}`,
	);

	await Promise.all(
		response.data.data.map(async item => {
			item.fechaNacimiento = formatDate(item.fechaNacimiento);
			if (item.nimagen != null) {
				console.log('name>>>', item.nimagen);
				item.imgFire = await getPhoto(item.nimagen, 'cliente');
				console.log('IMGFIRE>>>', item.imgFire);
			}
		}),
	);

	return response.data;
};
