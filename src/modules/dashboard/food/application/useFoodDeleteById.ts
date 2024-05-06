import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { FoodResponse } from '../domain';
import { FOOD_PAGINATED_SEARCH } from './QueryKeys';
import { FoodRepository } from '../infraestrcuture';

const useFoodDeleteById = (): UseMutationResult<FoodResponse, Error, number> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (id: number) => await FoodRepository.deleteById(id),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [FOOD_PAGINATED_SEARCH] });
		},
	});

	return response;
};

export default useFoodDeleteById;
