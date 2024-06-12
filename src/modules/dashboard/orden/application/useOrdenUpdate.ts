import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrdenResponse } from '../domain/OrdenResponse';
import { OrdenSave } from '../domain/OrdenSave';
import { OrdenRepository } from '../infraestructura';
import { ORDEN_PAGINATED_SEARCH } from './QueryKeys';

interface OrdenUpdateProps {
	id: number;
	orden: OrdenSave;
}

const useOrdenUpdate = (): UseMutationResult<OrdenResponse, Error, OrdenUpdateProps> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (payload: OrdenUpdateProps) =>
			await OrdenRepository.updateOrden(payload.id, payload.orden),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [ORDEN_PAGINATED_SEARCH],
			});
		},
	});

	return response;
};

export default useOrdenUpdate;
