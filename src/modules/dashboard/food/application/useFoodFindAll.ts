import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { FoodResponse } from '../domain';
import { FOOD_FIND_ALL } from './QueryKeys';
import { FoodRepository } from '../infraestrcuture';

const useFoodFindAll = (): UseQueryResult<FoodResponse[], Error> => {
	const response = useQuery({
		queryKey: [FOOD_FIND_ALL],
		queryFn: async () => await FoodRepository.findAll(),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default useFoodFindAll;
