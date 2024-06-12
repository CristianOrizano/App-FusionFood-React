import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { DetalleOrden } from '../domain/OrdenRequest';
import { DETALLEORDEN_FIND_BY_ID } from './QueryKeys';
import { OrdenRepository } from '../infraestructura';
import { DetalleOrdenList } from '../domain/DetalleOrdenList';

const useDetalleOrden = (id: number): UseQueryResult<DetalleOrdenList[], Error> => {
	const response = useQuery({
		queryKey: [DETALLEORDEN_FIND_BY_ID, id],
		queryFn: async () => await OrdenRepository.detalleOrdenPorId(id),
		enabled: !(id == null),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default useDetalleOrden;
