import axios, { AxiosResponse } from 'axios';

import { API_BASE_URL } from '@/core/constantes/env';

import { CategoriaFilter, CategoriaRequest, CategoriaResponse } from '../../domain';
import { CategoriaRequestMap, CategoriaResponseMap } from '../model';
import { PaginationRequest, PaginationResponse } from '@/modules/shared/domain';
import { stringify } from 'qs';
import CategoriaListSimple from '../../domain/CategoriaListSimple';
import { getPhoto } from '@/core/firebase/config';

export const findAll = async (): Promise<CategoriaResponse[]> => {
	const response: AxiosResponse<CategoriaResponseMap[]> = await axios.get(
		`${API_BASE_URL}/api/categoria`,
	);
	const categoriaPromises: Promise<CategoriaResponse>[] = response.data.map(async item => {
		const categoria: CategoriaResponse = {
			id: item.id,
			nombre: item.nombre,
			descripcion: item.descripcion,
			estado: item.estado,
		};
		if (item.nombreImg != null) {
			console.log('name>>>', item.nombreImg);
			categoria.imgFire = await getPhoto(item.nombreImg, 'categoria');
			console.log('IMGFIRE>>>', categoria.imgFire);
		}
		return categoria;
	});
	// Espera a que todas las promesas se resuelvan
	const categorias: CategoriaResponse[] = await Promise.all(categoriaPromises);

	return categorias;
};

/*
export const findAll = async (): Promise<CategoriaResponse[]> => {
	const response: AxiosResponse<CategoriaResponseMap[]> = await axios.get(
		`${API_BASE_URL}/api/categoria`,
	);
	const categoriaPromises: Promise<CategoriaResponse>[] = response.data.map(async item => {
		const categoria: CategoriaResponse = {
			id: item.id,
			nombre: item.nombre,
			descripcion: item.descripcion,
			estado: item.estado,
		};
		if (item.nombreImg != null) {
			console.log('name>>>', item.nombreImg);
			categoria.imgFire = await getPhoto(item.nombreImg, 'categoria');
			console.log('IMGFIRE>>>', categoria.imgFire);
		}
		return categoria;
	});
	// Espera a que todas las promesas se resuelvan
	const categorias: CategoriaResponse[] = await Promise.all(categoriaPromises);

	return categorias;
};

*/

export const findAllSimple = async (): Promise<CategoriaListSimple[]> => {
	const response: AxiosResponse<CategoriaListSimple[]> = await axios.get(
		`${API_BASE_URL}/api/categoria/listasimple`,
	);
	return response.data;
};

export const findById = async (id: number): Promise<CategoriaResponse> => {
	const response: AxiosResponse<CategoriaResponseMap> = await axios.get(
		`${API_BASE_URL}/api/categoria/${id}`,
	);
	const CategoriaResponseMap: CategoriaResponseMap = response.data;

	const categoria: CategoriaResponse = {
		id: CategoriaResponseMap.id,
		nombre: CategoriaResponseMap.nombre,
		descripcion: CategoriaResponseMap.descripcion,
		nombreImg: CategoriaResponseMap.nombreImg,
		estado: CategoriaResponseMap.estado,
	};

	return categoria;
};

export const create = async (categoria: CategoriaRequest): Promise<CategoriaResponse> => {
	const CategoriaRequestMap: CategoriaRequestMap = {
		nombre: categoria.nombre,
		descripcion: categoria.descripcion,
		nombreImg: categoria.nombreImg,
	};

	const response: AxiosResponse<CategoriaResponseMap> = await axios.post(
		`${API_BASE_URL}/api/categoria`,
		CategoriaRequestMap,
	);

	const CategoriaResponseMap: CategoriaResponseMap = response.data;

	const newCategoria: CategoriaResponse = {
		id: CategoriaResponseMap.id,
		nombre: CategoriaResponseMap.nombre,
		descripcion: CategoriaResponseMap.descripcion,
		nombreImg: CategoriaResponseMap.nombreImg,
		estado: CategoriaResponseMap.estado,
	};

	return newCategoria;
};

export const update = async (
	id: number,
	categoria: CategoriaRequest,
): Promise<CategoriaResponse> => {
	const CategoriaRequestMap: CategoriaRequestMap = {
		nombre: categoria.nombre,
		descripcion: categoria.descripcion,
		nombreImg: categoria.nombreImg,
	};

	const response: AxiosResponse<CategoriaResponseMap> = await axios.put(
		`${API_BASE_URL}/api/categoria/${id}`,
		CategoriaRequestMap,
	);

	const CategoriaResponseMap: CategoriaResponseMap = response.data;

	const updatedCategoria: CategoriaResponse = {
		id: CategoriaResponseMap.id,
		nombre: CategoriaResponseMap.nombre,
		descripcion: CategoriaResponseMap.descripcion,
		nombreImg: CategoriaResponseMap.nombreImg,
		estado: CategoriaResponseMap.estado,
	};

	return updatedCategoria;
};

export const deleteById = async (id: number): Promise<CategoriaResponse> => {
	const response: AxiosResponse<CategoriaResponseMap> = await axios.delete(
		`${API_BASE_URL}/api/categoria/${id}`,
	);

	const CategoriaResponseMap: CategoriaResponseMap = response.data;

	const updatedCategoria: CategoriaResponse = {
		id: CategoriaResponseMap.id,
		nombre: CategoriaResponseMap.nombre,
		descripcion: CategoriaResponseMap.descripcion,
		nombreImg: CategoriaResponseMap.nombreImg,
		estado: CategoriaResponseMap.estado,
	};

	return updatedCategoria;
};

export const paginatedSearch = async (
	paginationRequest: PaginationRequest<CategoriaFilter>,
): Promise<PaginationResponse<CategoriaResponse>> => {
	const paramsString: string = stringify(paginationRequest, {
		allowDots: true,
	});

	const response: AxiosResponse<PaginationResponse<CategoriaResponseMap>> = await axios.get(
		`${API_BASE_URL}/api/categoria/busquedapaginada?${paramsString}`,
	);

	const paginationResponse: PaginationResponse<CategoriaResponseMap> = response.data;

	const categorias: CategoriaResponse[] = await Promise.all(
		paginationResponse.data.map(async item => {
			const categoria: CategoriaResponse = {
				id: item.id,
				nombre: item.nombre,
				descripcion: item.descripcion,
				nombreImg: item.nombreImg,
				estado: item.estado,
			};
			if (item.nombreImg != null) {
				console.log('name>>>', item.nombreImg);
				categoria.imgFire = await getPhoto(item.nombreImg, 'categoria');
				console.log('IMGFIRE>>>', categoria.imgFire);
			}
			return categoria;
		}),
	);

	const paginationCategoria: PaginationResponse<CategoriaResponse> = {
		from: paginationResponse.from,
		to: paginationResponse.to,
		perPage: paginationResponse.perPage,
		currentPage: paginationResponse.currentPage,
		lastPage: paginationResponse.lastPage,
		total: paginationResponse.total,
		data: categorias,
	};

	return paginationCategoria;
};
