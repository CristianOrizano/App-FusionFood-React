import CategoriaListSimple from '../../categorias/domain/CategoriaListSimple';

export default interface FoodResponse {
	id: number;
	descripcion: string;
	categoria: CategoriaListSimple;
	precio: number;
	estado: boolean;
}
