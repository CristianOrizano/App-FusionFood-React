import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { ClienteRequest, ClienteResponse } from '../domain';
import { ClienteRepository } from '../infraestructura/repository';
import { CLIENTE_PAGINATED_SEARCH } from './QueryKeys';

const useClienteCreate = (): UseMutationResult<ClienteResponse, Error, ClienteRequest> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (cliente: ClienteRequest) => await ClienteRepository.create(cliente),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [CLIENTE_PAGINATED_SEARCH],
			});
		},
	});

	return response;
};

export default useClienteCreate;
