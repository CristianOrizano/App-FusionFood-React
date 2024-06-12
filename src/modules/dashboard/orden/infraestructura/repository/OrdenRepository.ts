import axios, { AxiosResponse } from 'axios';
import { OrdenRequest } from '../../domain/OrdenRequest';
import { API_BASE_URL } from '@/core/constantes/env';
import { PaginationRequest, PaginationResponse } from '@/modules/shared/domain';
import { OrdenFilter } from '../../domain/OrdenFilter';
import { OrdenResponse } from '../../domain/OrdenResponse';
import { stringify } from 'qs';
import { formatDatetime } from '@/core/helpers/DayjsHelper';
import { DetalleOrdenList } from '../../domain/DetalleOrdenList';
import { getPhoto } from '@/core/firebase/config';
import { EstadoPedidoResponse } from '../../domain/EstadoPedidoResponse';
import { OrdenSave } from '../../domain/OrdenSave';

export const registrar = async (orden: OrdenRequest): Promise<string> => {
	const response: AxiosResponse<string> = await axios.post(
		`${API_BASE_URL}/api/orden/saveorden`,
		orden,
	);
	return response.data;
};

export const updateOrden = async (id: number, orden: OrdenSave): Promise<OrdenResponse> => {
	const response: AxiosResponse<OrdenResponse> = await axios.put(
		`${API_BASE_URL}/api/orden/${id}`,
		orden,
	);
	return response.data;
};

export const findAllEstadoPedido = async (): Promise<EstadoPedidoResponse[]> => {
	const response: AxiosResponse<EstadoPedidoResponse[]> = await axios.get(
		`${API_BASE_URL}/api/estadopedido/listasimple`,
	);

	return response.data;
};

export const detalleOrdenPorId = async (id: number): Promise<DetalleOrdenList[]> => {
	const response: AxiosResponse<DetalleOrdenList[]> = await axios.get(
		`${API_BASE_URL}/api/orden/buscardetallepor/${id}`,
	);
	await Promise.all(
		response.data.map(async item => {
			if (item.foodMenu.nombreImg != null) {
				item.imgFire = await getPhoto(item.foodMenu.nombreImg, 'food');
			}
		}),
	);

	return response.data;
};

export const paginatedSearch = async (
	paginationRequest: PaginationRequest<OrdenFilter>,
): Promise<PaginationResponse<OrdenResponse>> => {
	const paramsString: string = stringify(paginationRequest, {
		allowDots: true,
	});

	const response: AxiosResponse<PaginationResponse<OrdenResponse>> = await axios.get(
		`${API_BASE_URL}/api/orden/busquedapaginada?${paramsString}`,
	);

	response.data.data.map(item => {
		item.fechaOrden = formatDatetime(item.fechaOrden);

		item.total = parseFloat(item.total).toLocaleString('es-PE', {
			style: 'currency',
			currency: 'PEN',
		});
	});

	return response.data;
};
