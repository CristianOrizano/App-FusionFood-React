import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { ClienteResponse } from '../domain';
import { ClienteRepository } from '../infraestructura/repository';
import { CLIENTE_PAGINATED_SEARCH } from './QueryKeys';

const useClienteDeleteById = (): UseMutationResult<ClienteResponse, Error, number> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (id: number) => await ClienteRepository.deleteById(id),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [CLIENTE_PAGINATED_SEARCH] });
		},
	});

	return response;
};

export default useClienteDeleteById;
