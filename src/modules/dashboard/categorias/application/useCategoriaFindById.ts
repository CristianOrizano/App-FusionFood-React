import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { CategoriaRepository } from '../infraestructure';
import { CATEGORIA_FIND_BY_ID } from './QueryKeys';
import { CategoriaResponse } from '../domain';

const useCategoriaFindById = (id?: number): UseQueryResult<CategoriaResponse, Error> => {
	const response = useQuery({
		queryKey: [CATEGORIA_FIND_BY_ID, id],
		queryFn: async () => await CategoriaRepository.findById(Number(id)),
		enabled: !(id == null),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default useCategoriaFindById;
