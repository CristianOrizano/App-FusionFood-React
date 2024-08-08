import axios, { AxiosResponse } from 'axios';
import { FoodFilter, FoodRequest, FoodResponse } from '../../domain';
import { FoodRequestMap, FoodResponseMap } from '../model';
import { API_BASE_URL } from '@/core/constantes/env';
import { PaginationRequest, PaginationResponse } from '@/modules/shared/domain';
import { stringify } from 'qs';
import { getPhoto } from '@/core/firebase/config';

export const findAll = async (): Promise<FoodResponse[]> => {
	const response: AxiosResponse<FoodResponseMap[]> = await axios.get(
		`${API_BASE_URL}/api/foodmenu`,
	);
	const food: FoodResponse[] = response.data.map(item => {
		const food: FoodResponse = {
			id: item.id,
			categoria: item.categoria,
			precio: item.precio,
			descripcion: item.descripcion,
			nombre: item.nombre,
			nombreImg: item.nombreImg,
			estado: item.estado,
		};
		return food;
	});

	return food;
};

export const findById = async (id: number): Promise<FoodResponse> => {
	const response: AxiosResponse<FoodResponseMap> = await axios.get(
		`${API_BASE_URL}/api/foodmenu/${id}`,
	);
	const FoodResponseMap: FoodResponseMap = response.data;

	const food: FoodResponse = {
		id: FoodResponseMap.id,
		categoria: FoodResponseMap.categoria,
		precio: FoodResponseMap.precio,
		nombre: FoodResponseMap.nombre,
		descripcion: FoodResponseMap.descripcion,
		nombreImg: FoodResponseMap.nombreImg,
		estado: FoodResponseMap.estado,
	};

	return food;
};

export const create = async (food: FoodRequest): Promise<FoodResponse> => {
	const FoodRequestMap: FoodRequestMap = {
		idCategoria: food.idCategoria,
		precio: food.precio,
		nombre: food.nombre,
		descripcion: food.descripcion,
		nombreImg: food.nombreImg,
	};

	const response: AxiosResponse<FoodResponseMap> = await axios.post(
		`${API_BASE_URL}/api/foodmenu`,
		FoodRequestMap,
	);

	const FoodResponseMap: FoodResponseMap = response.data;

	const newFood: FoodResponse = {
		id: FoodResponseMap.id,
		precio: FoodResponseMap.precio,
		categoria: FoodResponseMap.categoria,
		nombre: FoodResponseMap.nombre,
		descripcion: FoodResponseMap.descripcion,
		nombreImg: FoodResponseMap.nombreImg,
		estado: FoodResponseMap.estado,
	};

	return newFood;
};

export const update = async (id: number, food: FoodRequest): Promise<FoodResponse> => {
	const FoodRequestMap: FoodRequestMap = {
		idCategoria: food.idCategoria,
		precio: food.precio,
		nombre: food.nombre,
		descripcion: food.descripcion,
		nombreImg: food.nombreImg,
	};

	const response: AxiosResponse<FoodResponseMap> = await axios.put(
		`${API_BASE_URL}/api/foodmenu/${id}`,
		FoodRequestMap,
	);

	const FoodResponseMap: FoodResponseMap = response.data;

	const updateFood: FoodResponse = {
		id: FoodResponseMap.id,
		precio: FoodResponseMap.precio,
		categoria: FoodResponseMap.categoria,
		nombre: FoodResponseMap.nombre,
		descripcion: FoodResponseMap.descripcion,
		nombreImg: FoodResponseMap.nombreImg,
		estado: FoodResponseMap.estado,
	};

	return updateFood;
};

export const deleteById = async (id: number): Promise<FoodResponse> => {
	const response: AxiosResponse<FoodResponseMap> = await axios.delete(
		`${API_BASE_URL}/api/foodmenu/${id}`,
	);

	const FoodResponseMap: FoodResponseMap = response.data;

	const updateFood: FoodResponse = {
		id: FoodResponseMap.id,
		precio: FoodResponseMap.precio,
		categoria: FoodResponseMap.categoria,
		nombre: FoodResponseMap.nombre,
		descripcion: FoodResponseMap.descripcion,
		nombreImg: FoodResponseMap.nombreImg,
		estado: FoodResponseMap.estado,
	};

	return updateFood;
};

export const paginatedSearch = async (
	paginationRequest: PaginationRequest<FoodFilter>,
): Promise<PaginationResponse<FoodResponse>> => {
	const paramsString: string = stringify(paginationRequest, {
		allowDots: true,
	});

	const response: AxiosResponse<PaginationResponse<FoodResponseMap>> = await axios.get(
		`${API_BASE_URL}/api/foodmenu/busquedapaginada?${paramsString}`,
	);

	const paginationResponse: PaginationResponse<FoodResponseMap> = response.data;

	const foods: FoodResponse[] = await Promise.all(
		paginationResponse.data.map(async item => {
			const food: FoodResponse = {
				id: item.id,
				categoria: item.categoria,
				precio: item.precio,
				nombre: item.nombre,
				descripcion: item.descripcion,
				nombreImg: item.nombreImg,
				estado: item.estado,
			};
			if (item.nombreImg != null) {
				food.imgFire = await getPhoto(item.nombreImg, 'food');
			}

			return food;
		}),
	);

	const paginationCategoria: PaginationResponse<FoodResponse> = {
		from: paginationResponse.from,
		to: paginationResponse.to,
		perPage: paginationResponse.perPage,
		currentPage: paginationResponse.currentPage,
		lastPage: paginationResponse.lastPage,
		total: paginationResponse.total,
		data: foods,
	};

	return paginationCategoria;
};
