import { useEffect, useState } from 'react';

import {
	addItemToCart,
	fetchCartItems,
	removeItemFromCart,
} from '../infraestrcuture/repository/FoodCarRepository';
import { FoodCar } from '../domain';

export const useCart2 = () => {
	const [cartItems, setCartItems] = useState<FoodCar[]>([]);

	const addToCart = (product: FoodCar) => {
		addItemToCart(product);
		fetchCartItems().then(setCartItems);
	};

	const removeFromCart = (productId: number) => {
		removeItemFromCart(productId);
		fetchCartItems().then(setCartItems);
	};

	const clear = () => {
		setCartItems([]);
	};
	useEffect(() => {
		fetchCartItems().then(setCartItems); // Carga inicial del carrito al montar el componente
	}, []);

	return {
		cartItems,
		addToCart,
		removeFromCart,
		clear,
	};
};
