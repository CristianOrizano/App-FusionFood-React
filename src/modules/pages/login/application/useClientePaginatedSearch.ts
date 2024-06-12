import { PaginationRequest, PaginationResponse } from '@/modules/shared/domain';
import { ClienteFilter, ClienteResponse } from '../domain';
import { DefinedUseQueryResult, useQuery } from '@tanstack/react-query';
import { CLIENTE_PAGINATED_SEARCH } from './QueryKeys';
import { ClienteRepository } from '../infraestructura/repository';

const useClientePaginatedSearch = (
	paginationRequest: PaginationRequest<ClienteFilter>,
): DefinedUseQueryResult<PaginationResponse<ClienteResponse>, Error> => {
	const response = useQuery({
		queryKey: [CLIENTE_PAGINATED_SEARCH, paginationRequest],
		queryFn: async () => await ClienteRepository.paginatedSearch(paginationRequest),
		retry: 0,
		refetchOnWindowFocus: false,
		initialData: {
			from: 0,
			to: 0,
			perPage: 0,
			currentPage: 0,
			lastPage: 0,
			total: 0,
			data: [],
		},
	});

	return response;
};

export default useClientePaginatedSearch;
