import Swal from 'sweetalert2';

export const showAlertCondition = async (message: string, callback: () => Promise<void>) => {
	const result = await Swal.fire({
		title: 'Estas Seguro?',
		text: message,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si',
	});

	if (result.isConfirmed) {
		await callback(); // Espera a que se resuelva la promesa devuelta por la función de retorno de llamada
	}
};
