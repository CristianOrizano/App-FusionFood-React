import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Button, Form, Modal, ModalProps } from 'react-bootstrap';
import { useCategoriaCreate, useCategoriaFindById, useCategoriaUpdate } from '../../application';
import { getPhoto, updateImage, uploadImage } from '@/core/firebase/config';
import { CategoriaRequest } from '../../domain';
import { v4 } from 'uuid';
import Swal from 'sweetalert2';
import upload from '@/core/imagenes/upload.jpg';

export interface ModalPhotoSaveRef {
	openModal: (id?: number) => void;
	closeModal?: () => void;
}

const ModalPhotoSave = forwardRef<ModalPhotoSaveRef, ModalProps>((_, ref) => {
	// Attributes
	const [show, setShow] = useState<boolean>(false);
	const [selectedFile, setSelectedFile] = useState<File>();
	const [id, setId] = useState<number>();
	const [errorMessage, setErrorMessage] = useState<string>('');
	// Hooks
	const { data: categoriaData, isFetching: isFetchingFood } = useCategoriaFindById(id);
	const { mutateAsync: mutateAsyncCreate } = useCategoriaCreate();
	const { mutateAsync: mutateAsyncEdit } = useCategoriaUpdate();

	const [isImageSelected, setIsImageSelected] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	// Methods
	const openModal = (id?: number): void => {
		setShow(true);
		setId(id);
	};

	const closeModal = (): void => {
		setShow(false);
		setId(undefined);
		setSelectedImage(null);
		setIsImageSelected(false);
	};

	// ImperativeHandle
	useImperativeHandle(ref, () => {
		return {
			openModal,
			closeModal,
		};
	});
	useEffect(() => {
		if (categoriaData?.nombreImg != null) {
			getPhoto(categoriaData.nombreImg, 'categoria')
				.then(url => {
					setSelectedImage(url); // Actualiza el estado con la URL de la imagen
				})
				.catch(error => {
					console.error('Error al obtener la URL de la imagen:', error);
					// Maneja el error si ocurre
				});
		}
	}, [categoriaData]);

	const uploadPhoto = async (): Promise<void> => {
		try {
			if (id != null) {
				const categoria: CategoriaRequest = {
					nombre: categoriaData?.nombre ?? '',
					descripcion: categoriaData?.descripcion ?? '',
				};
				if (categoriaData?.nombreImg != null) {
					await updateImage(selectedFile as File, categoriaData.nombreImg, 'categoria');
					categoria.nombreImg = categoriaData.nombreImg;
				} else {
					const name = v4();
					await uploadImage(selectedFile as File, name, 'categoria');
					categoria.nombreImg = name;
				}
				await mutateAsyncEdit({ id, categoria });
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
		console.log('Target ', e);

		const file = e.target.files?.[0];
		setSelectedFile(file);
		console.log('File ', file);
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

	return (
		<>
			<Modal show={show} onHide={closeModal} backdrop="static">
				<Modal.Header closeButton className="bg-primary ">
					<Modal.Title className="text-white fw-bold">Cambiar Foto</Modal.Title>
				</Modal.Header>
				<Modal.Body className="bg-white text-center">
					<img
						src={selectedImage || upload}
						className="avatar img-fluid shadow-lg p-3 mb-5 bg-body rounded"
						style={{ width: '270px', height: '270px' }}
					/>
					{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
					<Form.Group controlId="formFile" className="mb-3">
						<Form.Control type="file" accept=".png, .jpg, .jpeg" onChange={handleImageChange} />
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="outline-secondary"
						onClick={() => {
							closeModal();
						}}
					>
						Cancelar
					</Button>
					<Button
						variant="outline-danger"
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
export default ModalPhotoSave;
