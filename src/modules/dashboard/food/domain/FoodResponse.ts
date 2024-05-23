import CategoriaListSimple from '../../categorias/domain/CategoriaListSimple';

export default interface FoodResponse {
	id: number;
	descripcion: string;
	nombre: string;
	categoria: CategoriaListSimple;
	nombreImg: string;
	imgFire?: string;
	precio: number;
	estado: boolean;
}
