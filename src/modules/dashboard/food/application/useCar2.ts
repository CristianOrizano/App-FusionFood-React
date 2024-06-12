import { useContext, useEffect, useState } from 'react';
import { CarContext } from '../infraestrcuture/context/CarContext';
import {
	addItemToCart,
	clearCart,
	fetchCartItems,
	removeItemFromCart,
	updateQuantity,
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

	const updateCantidad = (productId: number, quantity: number) => {
		updateQuantity(productId, quantity);
		fetchCartItems().then(setCartItems);
	};

	const clear = () => {
		clearCart();
		setCartItems([]);
	};
	useEffect(() => {
		fetchCartItems().then(setCartItems); // Carga inicial del carrito al montar el componente
	}, []);

	return {
		cartItems,
		addToCart,
		removeFromCart,
		updateQuantity,
		clear,
		updateCantidad,
	};
};
