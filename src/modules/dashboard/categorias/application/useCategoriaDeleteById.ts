import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoriaResponse } from '../domain';
import { CategoriaRepository } from '../infraestructure';
import { CATEGORIA_PAGINATED_SEARCH } from './QueryKeys';

const useCategoriaDeleteById = (): UseMutationResult<CategoriaResponse, Error, number> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (id: number) => await CategoriaRepository.deleteById(id),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [CATEGORIA_PAGINATED_SEARCH] });
		},
	});

	return response;
};

export default useCategoriaDeleteById;
