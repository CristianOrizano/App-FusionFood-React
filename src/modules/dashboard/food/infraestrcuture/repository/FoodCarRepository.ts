import { getPhoto } from '@/core/firebase/config';
import { FoodCar } from '../../domain';

const STORAGE_CART_KEY = 'STORAGE_CART_APP';

export const saveCart = (cartItems: FoodCar[]): void => {
	localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cartItems));
};

export const getCart = (): FoodCar[] => {
	const data = localStorage.getItem(STORAGE_CART_KEY);
	if (data == null) return [];

	return JSON.parse(data);
};
export const addItemToCart = (product: FoodCar): void => {
	const cartItems = getCart();
	const itemIndex = cartItems.findIndex(item => item.id === product.id);

	if (itemIndex > -1) {
		cartItems[itemIndex].cantidad += 0;
	} else {
		cartItems.push(product);
	}

	saveCart(cartItems);
};

export const getTotalPagar = (): string => {
	const data = localStorage.getItem(STORAGE_CART_KEY);
	if (data == null) return '';
	const cartItems: FoodCar[] = JSON.parse(data);
	let totalPagar = 0;
	for (const item of cartItems) {
		totalPagar += item.precio * item.cantidad;
	}

	return Number(totalPagar.toFixed(2)).toLocaleString('es-PE', {
		style: 'currency',
		currency: 'PEN',
	}); //redondea
};

export const removeItemFromCart = (productId: number): void => {
	let cartItems = getCart();
	cartItems = cartItems.filter(item => item.id !== productId);
	saveCart(cartItems);
};

export const limpiarCarrito = (): void => {
	localStorage.removeItem(STORAGE_CART_KEY);
};

export const cartExists = (): boolean => {
	return localStorage.getItem(STORAGE_CART_KEY) != null;
};
export const contarTotal = (): number => {
	const cartItems = getCart();
	return cartItems.reduce((total, item) => total + item.cantidad, 0);
};

export const incrementQuantity = (productId: number): void => {
	const cartItems = getCart();
	const itemIndex = cartItems.findIndex(item => item.id === productId);

	if (itemIndex > -1) {
		cartItems[itemIndex].cantidad++;
		saveCart(cartItems);
	}
};

// Función para decrementar la cantidad de un producto en el carrito
export const decrementQuantity = (productId: number): void => {
	const cartItems = getCart();
	const itemIndex = cartItems.findIndex(item => item.id === productId);

	if (itemIndex > -1 && cartItems[itemIndex].cantidad > 1) {
		cartItems[itemIndex].cantidad--;
		saveCart(cartItems);
	}
};

export const fetchCartItems = async (): Promise<FoodCar[]> => {
	const cart = getCart();
	await Promise.all(
		cart.map(async item => {
			if (item.nombreImg) {
				item.imgFire = await getPhoto(item.nombreImg, 'food');
			}
		}),
	);
	return cart;
};
/*export const fetchCartItems = async (): Promise<FoodCar[]> => {
	const cart = getCart();
	await Promise.all(
		cart.map(async item => {
			if (item.nombreImg) {
				item.imgFire = await getPhoto(item.nombreImg, 'food');
				item.precio = item.precio.toLocaleString('es-PE', {
					style: 'currency',
					currency: 'PEN',
				});
			}
		}),
	);
	return cart;
}; */

/*export const fetchCartItems = async (): Promise<FoodCar[]> => {
    const cart = getCart();

    // Utilizar Promise.all junto con map para esperar a que todas las promesas se completen
    await Promise.all(cart.map(async item => {
        if (item.nombreImg) {
            item.imgFire = await getPhoto(item.nombreImg, 'food');
        }
    }));

    return cart; // Devolver el carrito una vez que todas las imágenes hayan sido obtenidas
}; */
/*export const fetchCartItems = async (): Promise<FoodCar[]> => {
	const cart = getCart();
	const cartWithImagesPromises = cart.map(async item => {
		if (item.nombreImg) {
			const imageUrl = await getPhoto(item.nombreImg, 'food');
			return { ...item, imgFire: imageUrl };
		}
		return item;
	});
	return await Promise.all(cartWithImagesPromises);
}; */
