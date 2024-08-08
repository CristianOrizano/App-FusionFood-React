import { useContext } from 'react';
import { CarContext } from '../infraestrcuture/context/CarContext';

export const useCart = () => {
	const context = useContext(CarContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
