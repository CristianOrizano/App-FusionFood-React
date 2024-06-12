import { PaginationRequest, PaginationResponse } from '@/modules/shared/domain';
import { ClienteFilter, ClienteRequest, ClienteResponse } from '../domain';
import {
	DefinedUseQueryResult,
	UseMutationResult,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { CLIENTE_PAGINATED_SEARCH } from './QueryKeys';
import { ClienteRepository } from '../infraestructura/repository';

interface ClienteUpdateProps {
	id: number;
	cliente: ClienteRequest;
}

const useClienteUpdate = (): UseMutationResult<ClienteResponse, Error, ClienteUpdateProps> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (payload: ClienteUpdateProps) =>
			await ClienteRepository.update(payload.id, payload.cliente),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [CLIENTE_PAGINATED_SEARCH],
			});
		},
	});

	return response;
};

export default useClienteUpdate;
