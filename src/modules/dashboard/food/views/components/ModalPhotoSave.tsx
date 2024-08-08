import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Button, Form, Modal, ModalProps } from 'react-bootstrap';
import upload from '@/core/imagenes/upload.jpg';
import { getPhoto, updateImage, uploadImage } from '@/core/firebase/config';
import { useFoodFindById, useFoodUpdate } from '../../application';
import Swal from 'sweetalert2';
import { FoodRequest } from '../../domain';
import { v4 } from 'uuid';
import ImageSkeleton from '@/core/components/loading/ImageSkeleton';

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
	const { data: foodData, isFetching } = useFoodFindById(id);
	const { mutateAsync: mutateAsyncEdit } = useFoodUpdate();

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
	// Define la función asíncrona fuera de useEffect
	const fetchImage = async () => {
		if (!foodData?.nombreImg) {
			return; // Salir si no hay nombre de imagen
		}
		try {
			const url = await getPhoto(foodData.nombreImg, 'food');
			setSelectedImage(url);
		} catch (error) {
			console.error('Error al obtener la URL de la imagen:', error);
		}
	};
	useEffect(() => {
		fetchImage();
	}, [foodData]);

	const uploadPhoto = async (): Promise<void> => {
		try {
			if (id != null) {
				const food: FoodRequest = {
					idCategoria: foodData?.categoria.id ?? 0,
					nombre: foodData?.nombre ?? '',
					descripcion: foodData?.descripcion ?? '',
					precio: foodData?.precio ?? 0,
				};
				if (foodData?.nombreImg != null) {
					await updateImage(selectedFile as File, foodData.nombreImg, 'food');
					food.nombreImg = foodData.nombreImg;
				} else {
					const name = v4();
					await uploadImage(selectedFile as File, name, 'food');
					food.nombreImg = name;
				}
				await mutateAsyncEdit({ id, food });
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

	return (
		<>
			<Modal show={show} onHide={closeModal} backdrop="static">
				<Modal.Header closeButton className="bg-primary ">
					<Modal.Title className="text-white fw-bold">Cambiar Foto</Modal.Title>
				</Modal.Header>
				<Modal.Body className="bg-white text-center">
					{isFetching ? (
						<ImageSkeleton />
					) : (
						<img
							src={selectedImage || upload}
							className="avatar img-fluid shadow-lg p-3 mb-5 bg-body rounded"
							style={{ width: '270px', height: '270px' }}
						/>
					)}

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
