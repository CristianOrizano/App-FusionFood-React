import CategoriaListSimple from '@/modules/dashboard/categorias/domain/CategoriaListSimple';

export default interface FoodResponseMap {
	id: number;
	descripcion: string;
	categoria: CategoriaListSimple;
	precio: number;
	estado: boolean;
}
