import axios, { AxiosResponse } from 'axios';
import { LoginRequest, LoginResponse } from '../../domain';
import { LoginRequestMap, LoginResponseMap } from '../model';
import { API_BASE_URL } from '@/core/constantes/env';

export const login = async (login: LoginRequest): Promise<LoginResponse> => {
	const loginRequestMap: LoginRequestMap = {
		username: login.username,
		password: login.password,
	};

	const response: AxiosResponse<LoginResponseMap> = await axios.post(
		`${API_BASE_URL}/api/usuario/login`,
		loginRequestMap,
	);

	const LoginResponseMap: LoginResponseMap = response.data;

	const userSecurity: LoginResponse = {
		security: {
			accesToken: LoginResponseMap.security.accesToken,
			expireOn: LoginResponseMap.security.expireOn,
			tokenType: LoginResponseMap.security.tokenType,
		},
	};

	return userSecurity;
};
