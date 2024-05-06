import { UseQueryResult, useQuery } from '@tanstack/react-query';
import CategoriaListSimple from '../domain/CategoriaListSimple';
import { CATEGORIA_FIND_SIMPLE_ALL } from './QueryKeys';
import { CategoriaRepository } from '../infraestructure';

const useCategoriaListSimple = (): UseQueryResult<CategoriaListSimple[], Error> => {
	const response = useQuery({
		queryKey: [CATEGORIA_FIND_SIMPLE_ALL],
		queryFn: async () => await CategoriaRepository.findAllSimple(),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default useCategoriaListSimple;
