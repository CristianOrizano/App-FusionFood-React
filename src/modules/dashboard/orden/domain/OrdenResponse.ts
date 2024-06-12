import { ClienteResponse } from '@/modules/pages/login/domain';

export interface EstadoPedido {
	id: number;
	nombre: string;
}

export interface OrdenResponse {
	id: number;
	fechaOrden: string; // O puedes usar Date si prefieres
	cliente: ClienteResponse;
	total: string;
	direccion: string;
	tipoPago: string;
	comentario: string;
	estadoPedido: EstadoPedido;
}
