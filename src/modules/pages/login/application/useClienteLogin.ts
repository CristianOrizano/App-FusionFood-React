import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { ClienteLogin, ClienteResponse } from '../domain';
import { ClienteRepository } from '../infraestructura/repository';

const useClienteLogin = (): UseMutationResult<ClienteResponse, Error, ClienteLogin> => {
	const response = useMutation({
		mutationFn: async (login: ClienteLogin) => await ClienteRepository.login(login),
		onError: (error: Error) => {
			if ((error as any).response !== undefined) {
				console.log('error', (error as any).response.data.Message);
			} else {
				console.log('error', error.message);
			}
		},
	});
	return response;
};

export default useClienteLogin;
