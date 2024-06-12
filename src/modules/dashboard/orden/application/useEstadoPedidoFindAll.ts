import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { EstadoPedidoResponse } from '../domain/EstadoPedidoResponse';
import { ESTADO_PEDIDO_FIND_ALL } from './QueryKeys';
import { OrdenRepository } from '../infraestructura';

const useEstadoPedidoFindAll = (): UseQueryResult<EstadoPedidoResponse[], Error> => {
	const response = useQuery({
		queryKey: [ESTADO_PEDIDO_FIND_ALL],
		queryFn: async () => await OrdenRepository.findAllEstadoPedido(),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default useEstadoPedidoFindAll;
