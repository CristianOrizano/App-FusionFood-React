import CategoriaListSimple from '@/modules/dashboard/categorias/domain/CategoriaListSimple';

export default interface FoodResponseMap {
	id: number;
	descripcion: string;
	nombre: string;
	nombreImg: string;
	categoria: CategoriaListSimple;
	precio: number;
	estado: boolean;
}
