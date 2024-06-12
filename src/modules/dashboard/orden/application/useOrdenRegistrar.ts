import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrdenRequest } from '../domain/OrdenRequest';

import { registrar } from '../infraestructura/repository/OrdenRepository';

const useOrdenRegistrar = (): UseMutationResult<string, Error, OrdenRequest> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (orden: OrdenRequest) => await registrar(orden),
	});

	return response;
};

export default useOrdenRegistrar;
