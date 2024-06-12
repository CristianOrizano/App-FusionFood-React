import { FoodResponse } from '../../food/domain';

export interface DetalleOrdenList {
	foodMenu: FoodResponse;
	cantidad: number;
	imgFire?: string;
}
