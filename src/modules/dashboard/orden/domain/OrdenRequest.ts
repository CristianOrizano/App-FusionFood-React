export interface OrdenRequest {
	idCliente: number;
	total: number;
	direccion: string;
	tipoPago: string;
	comentario: string;
	detalleOrdens: DetalleOrden[];
}

export interface DetalleOrden {
	idFood: number;
	cantidad: number;
}
