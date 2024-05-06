import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { FoodResponse } from '../domain';
import { FOOD_FIND_BY_ID } from './QueryKeys';
import { FoodRepository } from '../infraestrcuture';

const useFoodFindById = (id?: number): UseQueryResult<FoodResponse, Error> => {
	const response = useQuery({
		queryKey: [FOOD_FIND_BY_ID, id],
		queryFn: async () => await FoodRepository.findById(Number(id)),
		enabled: !(id == null),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default useFoodFindById;
