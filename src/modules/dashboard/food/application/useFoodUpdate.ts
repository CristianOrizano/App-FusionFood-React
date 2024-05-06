import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { FoodRequest, FoodResponse } from '../domain';
import { FoodRepository } from '../infraestrcuture';
import { FOOD_PAGINATED_SEARCH } from './QueryKeys';

interface FoodUpdateProps {
	id: number;
	food: FoodRequest;
}

const useFoodUpdate = (): UseMutationResult<FoodResponse, Error, FoodUpdateProps> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (payload: FoodUpdateProps) =>
			await FoodRepository.update(payload.id, payload.food),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [FOOD_PAGINATED_SEARCH],
			});
		},
	});

	return response;
};

export default useFoodUpdate;
