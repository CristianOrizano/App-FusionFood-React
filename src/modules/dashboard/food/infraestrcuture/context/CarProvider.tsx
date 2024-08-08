import { ReactNode, useEffect, useState } from 'react';
import {
	addItemToCart,
	contarTotal,
	decrementQuantity,
	fetchCartItems,
	getTotalPagar,
	incrementQuantity,
	limpiarCarrito,
	removeItemFromCart,
} from '../repository/FoodCarRepository';

import { FoodCar } from '../../domain';
import { CarContext } from './CarContext';

const CarProvider = ({ children }: { children: ReactNode }) => {
	const [carritoLista, setCarritoLista] = useState<FoodCar[]>([]);

	const addToCart = (product: FoodCar) => {
		addItemToCart(product);
		fetchCartItems().then(setCarritoLista); // Actualiza el estado del carrito después de agregar un producto
	};
	const removeFromCart = (productId: number) => {
		removeItemFromCart(productId);
		fetchCartItems().then(setCarritoLista); // Actualiza el estado del carrito después de eliminar un producto
	};

	const aumentar = (productId: number) => {
		incrementQuantity(productId);
		fetchCartItems().then(setCarritoLista);
	};
	const disminuir = (productId: number) => {
		decrementQuantity(productId);
		fetchCartItems().then(setCarritoLista);
	};
	const contar = (): number => {
		// Actualiza el estado del carrito después de actualizar la cantidad
		return contarTotal();
	};
	const total = (): string => {
		// Actualiza el estado del carrito después de actualizar la cantidad
		return getTotalPagar();
	};

	const clearCart = () => {
		limpiarCarrito();
		setCarritoLista([]); // Limpia el estado del carrito
	};

	useEffect(() => {
		fetchCartItems().then(setCarritoLista); // Carga inicial del carrito al montar el componente
	}, []);
	return (
		<CarContext.Provider
			value={{
				total,
				contar,
				carritoLista,
				addToCart,
				removeFromCart,
				clearCart,
				fetchCartItems,
				aumentar,
				disminuir,
			}}
		>
			{children}
		</CarContext.Provider>
	);
};

export default CarProvider;
