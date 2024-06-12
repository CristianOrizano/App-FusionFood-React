import { PaginationRequest, PaginationResponse } from '@/modules/shared/domain';
import { UsuarioFilter, UsuarioResponse } from '../domain';
import { DefinedUseQueryResult, useQuery } from '@tanstack/react-query';
import { USUARIO_PAGINATED_SEARCH } from './QueryKeys';
import { UsuarioRepository } from '../infraestructura';

const useUsuarioPaginated = (
	paginationRequest: PaginationRequest<UsuarioFilter>,
): DefinedUseQueryResult<PaginationResponse<UsuarioResponse>, Error> => {
	const response = useQuery({
		queryKey: [USUARIO_PAGINATED_SEARCH, paginationRequest],
		queryFn: async () => await UsuarioRepository.paginatedSearch(paginationRequest),
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

export default useUsuarioPaginated;
