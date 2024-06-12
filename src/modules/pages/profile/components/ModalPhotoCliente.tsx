import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Button, Form, Modal, ModalProps } from 'react-bootstrap';
import perfil from '../../../../core/imagenes/profile.png';
import Swal from 'sweetalert2';
import { ClienteRequest } from '../../login/domain';
import { useFoodFindById } from '@/modules/dashboard/food/application';
import useClienteFindById from '../../login/application/useClienteFindById';
import { getPhoto, updateImage, uploadImage } from '@/core/firebase/config';
import { v4 } from 'uuid';
import useClienteUpdate from '../../login/application/useClienteUpdate';
import { LocalStorageSessionCliente } from '@/core/sessions';

export interface ModalPhotoClienteSaveRef {
	openModal: (id?: number) => void;
	closeModal?: () => void;
}

const ModalPhotoCliente = forwardRef<ModalPhotoClienteSaveRef, ModalProps>((_, ref) => {
	// Attributes
	const [isImageSelected, setIsImageSelected] = useState(false);
	const [show, setShow] = useState<boolean>(false);
	const [selectedFile, setSelectedFile] = useState<File>();
	const [id, setId] = useState<number>();
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const { mutateAsync: mutateAsyncEdit } = useClienteUpdate();
	const { data: clienteData, isFetching: isFetchingFood } = useClienteFindById(id);
	// Methods
	const openModal = (id?: number): void => {
		setShow(true);
		setId(id);
	};

	const closeModal = (): void => {
		setShow(false);
		setId(undefined);
	};

	// ImperativeHandle
	useImperativeHandle(ref, () => {
		return {
			openModal,
			closeModal,
		};
	});
	const uploadPhoto = async (): Promise<void> => {
		try {
			console.log('XDD', clienteData);
			if (id != null) {
				const cliente: ClienteRequest = {
					nombres: clienteData?.nombres ?? '',
					apellidos: clienteData?.apellidos ?? '',
					fechaNacimiento: clienteData?.fechaNacimiento ?? '',
					telefono: clienteData?.telefono ?? 0,
					correo: clienteData?.correo ?? '',
					contrasena: clienteData?.contrasena ?? '',
				};

				if (clienteData?.nimagen != null) {
					console.log('TIENE IMAGEN');
					await updateImage(selectedFile as File, clienteData.nimagen, 'cliente');
					cliente.nimagen = clienteData.nimagen;
				} else {
					console.log('NO TIENE');
					const name = v4();
					await uploadImage(selectedFile as File, name, 'cliente');
					cliente.nimagen = name;
				}
				const clien = await mutateAsyncEdit({ id, cliente });
				LocalStorageSessionCliente.saveAuthorization(clien);
				Swal.fire({
					title: 'Correcto!',
					text: 'Exito al guardar!',
					icon: 'success',
				});
				closeModal();
			}
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Error al guardar',
			});
			console.log('Error', error);
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setSelectedFile(file);

		if (file) {
			setIsImageSelected(true);
			if (file.type === 'image/png' || file.type === 'image/jpeg') {
				const reader = new FileReader();
				reader.onloadend = () => {
					setSelectedImage(reader.result as string);
					setErrorMessage('');
				};
				reader.readAsDataURL(file);
			} else {
				setSelectedImage(null);
				setErrorMessage('Por favor, selecciona un archivo PNG o JPG.');
			}
		}
	};

	useEffect(() => {
		if (clienteData?.nimagen != null) {
			getPhoto(clienteData.nimagen, 'cliente')
				.then(url => {
					setSelectedImage(url); // Actualiza el estado con la URL de la imagen
				})
				.catch(error => {
					console.error('Error al obtener la URL de la imagen:', error);
					// Maneja el error si ocurre
				});
		}
	}, [clienteData]);
	return (
		<>
			<Modal show={show} onHide={closeModal} backdrop="static">
				<Modal.Header closeButton className="bg-dark ">
					<Modal.Title className="text-white ">Cambiar Foto</Modal.Title>
				</Modal.Header>
				<Modal.Body className="bg-white text-center">
					<img
						src={selectedImage || perfil}
						className="avatar img-fluid shadow-lg p-3 mb-5 bg-body rounded"
						style={{ width: '270px', height: '270px' }}
					/>
					{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
					<Form.Group controlId="formFile" className="mb-3">
						<Form.Control
							type="file"
							size="sm"
							accept=".png, .jpg, .jpeg"
							onChange={handleImageChange}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="outline-secondary"
						size="sm"
						onClick={() => {
							closeModal();
						}}
					>
						Cancelar
					</Button>
					<Button
						variant="outline-danger"
						size="sm"
						onClick={() => {
							uploadPhoto();
						}}
						disabled={!isImageSelected}
					>
						Guardar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
});
export default ModalPhotoCliente;
