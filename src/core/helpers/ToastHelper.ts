import { ToastOptions, toast } from 'react-toastify';

const config: ToastOptions = {
	position: 'top-right',
	autoClose: 5000,
	theme: 'light',
	style: {
		fontWeight: 'bold',
		color: '#222', // Establece la propiedad fontWeight en 'bold' para negrita
	},
};

const toastFire = (message: string, options: ToastOptions): void => {
	toast(message, options);
};

const toastSuccess = (message: string, autoClose?: number): void => {
	const currentOptions = Object.assign(config, {});
	currentOptions.autoClose = autoClose ?? config.autoClose;

	toast.success(message, currentOptions);
};

const toastError = (message: string, autoClose?: number): void => {
	const currentOptions = Object.assign(config, {});
	currentOptions.autoClose = autoClose ?? config.autoClose;

	toast.error(message, currentOptions);
};

const toastInfo = (message: string, autoClose?: number): void => {
	const currentOptions = Object.assign(config, {});
	currentOptions.autoClose = autoClose ?? config.autoClose;

	toast.info(message, currentOptions);
};

const toastWarning = (message: string, autoClose?: number): void => {
	const currentOptions = Object.assign(config, {});
	currentOptions.autoClose = autoClose ?? config.autoClose;

	toast.warn(message, currentOptions);
};

export { toastFire, toastSuccess, toastError, toastInfo, toastWarning };
