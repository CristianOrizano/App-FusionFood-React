import { PaginationRequest, PaginationResponse } from '@/modules/shared/domain';
import { OrdenFilter } from '../domain/OrdenFilter';
import { OrdenResponse } from '../domain/OrdenResponse';
import { DefinedUseQueryResult, useQuery } from '@tanstack/react-query';
import { ORDEN_PAGINATED_SEARCH } from './QueryKeys';
import { OrdenRepository } from '../infraestructura';

const useOrdenPaginatedSearch = (
	paginationRequest: PaginationRequest<OrdenFilter>,
): DefinedUseQueryResult<PaginationResponse<OrdenResponse>, Error> => {
	const response = useQuery({
		queryKey: [ORDEN_PAGINATED_SEARCH, paginationRequest],
		queryFn: async () => await OrdenRepository.paginatedSearch(paginationRequest),
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

export default useOrdenPaginatedSearch;
