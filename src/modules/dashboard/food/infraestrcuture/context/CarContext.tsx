import { createContext } from 'react';
import { FoodCar } from '../../domain';

interface CartContextType {
	carritoLista: FoodCar[];
	addToCart: (product: FoodCar) => void;
	removeFromCart: (productId: number) => void;

	clearCart: () => void;
	aumentar: (productId: number) => void;
	disminuir: (productId: number) => void;
	fetchCartItems: () => void;
	contar: () => number;
	total: () => string;
}

export const CarContext = createContext<CartContextType | undefined>(undefined);
