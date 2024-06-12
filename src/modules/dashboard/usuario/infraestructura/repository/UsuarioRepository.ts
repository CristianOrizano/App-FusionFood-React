import { PaginationRequest, PaginationResponse } from '@/modules/shared/domain';
import { UsuarioFilter, UsuarioResponse } from '../../domain';
import { stringify } from 'qs';
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/core/constantes/env';
import { getPhoto } from '@/core/firebase/config';

export const paginatedSearch = async (
	paginationRequest: PaginationRequest<UsuarioFilter>,
): Promise<PaginationResponse<UsuarioResponse>> => {
	const paramsString: string = stringify(paginationRequest, {
		allowDots: true,
	});

	const response: AxiosResponse<PaginationResponse<UsuarioResponse>> = await axios.get(
		`${API_BASE_URL}/api/usuario/busquedapaginada?${paramsString}`,
	);

	await Promise.all(
		response.data.data.map(async item => {
			if (item.nombreImg != null) {
				console.log('name>>>', item.nombreImg);
				item.imgFire = await getPhoto(item.nombreImg, 'categoria');
				console.log('IMGFIRE>>>', item.imgFire);
			}
		}),
	);

	return response.data;
};
