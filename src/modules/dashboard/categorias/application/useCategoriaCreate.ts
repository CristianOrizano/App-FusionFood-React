import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoriaRequest, CategoriaResponse } from '../domain';
import { CategoriaRepository } from '../infraestructure';
import { CATEGORIA_PAGINATED_SEARCH } from './QueryKeys';

const useCategoriaCreate = (): UseMutationResult<CategoriaResponse, Error, CategoriaRequest> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (categoria: CategoriaRequest) => await CategoriaRepository.create(categoria),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [CATEGORIA_PAGINATED_SEARCH],
			});
		},
	});

	return response;
};

export default useCategoriaCreate;
