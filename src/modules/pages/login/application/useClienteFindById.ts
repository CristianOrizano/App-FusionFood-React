import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ClienteResponse } from '../domain';
import { CLIENTE_FIND_BY_ID } from './QueryKeys';
import { ClienteRepository } from '../infraestructura/repository';

const useClienteFindById = (id?: number): UseQueryResult<ClienteResponse, Error> => {
	const response = useQuery({
		queryKey: [CLIENTE_FIND_BY_ID, id],
		queryFn: async () => await ClienteRepository.findById(Number(id)),
		enabled: !(id == null),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default useClienteFindById;
