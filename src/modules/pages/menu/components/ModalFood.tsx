import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Modal, ModalProps } from 'react-bootstrap';

import { useFoodFindById } from '@/modules/dashboard/food/application';

import { getPhoto } from '@/core/firebase/config';
import nodisponible from '../../../../core/imagenes/nodisponible.png';

import { FoodCar, FoodResponse } from '@/modules/dashboard/food/domain';

import { useCart } from '@/modules/dashboard/food/application/useCar';
import { toastSuccess } from '@/core/helpers/ToastHelper';

export interface ModalFoodRef {
	openModal: (id?: number) => void;
	closeModal?: () => void;
}
const ModalFood = forwardRef<ModalFoodRef, ModalProps>((_, ref) => {
	// Attributes
	const [show, setShow] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<string>();
	const [id, setId] = useState<number>();
	const [selectedValue, setSelectedValue] = useState('1');
	// Hooks
	const { addToCart } = useCart();
	//const { addToCart } = useCart2();
	const { data: food, isFetching: isFetchingFood } = useFoodFindById(id);
	// const { addToCart } = useCart();
	// Methods
	const openModal = (id?: number): void => {
		setShow(true);
		setId(id);
		// console.log('id', id);
	};

	const closeModal = (): void => {
		setSelectedValue('1');
		setSelectedImage('');
		setShow(false);
		setId(undefined);
	};
	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedValue(event.target.value);
	};

	const agregarCarro = (food: FoodResponse) => {
		const cantidad: number = parseInt(selectedValue);
		const foodcar: FoodCar = {
			id: food.id,
			descripcion: food.descripcion,
			nombre: food.nombre,
			cantidad: cantidad,
			nombreImg: food.nombreImg,
			imgFire: food.imgFire,
			precio: food.precio,
		};
		addToCart(foodcar);
		toastSuccess('Agregado al carrito');
		closeModal();
	};

	// ImperativeHandle
	useImperativeHandle(ref, () => {
		return {
			openModal,
			closeModal,
		};
	});

	useEffect(() => {
		if (food?.nombreImg != null) {
			getPhoto(food.nombreImg, 'food')
				.then(url => {
					setSelectedImage(url); // Actualiza el estado con la URL de la imagen
				})
				.catch(error => {
					console.error('Error al obtener la URL de la imagen:', error);
					// Maneja el error si ocurre
				});
		}
	}, [food]);

	return (
		<>
			<Modal show={show} onHide={closeModal} backdrop="static" centered size="xl">
				<Modal.Header closeButton className="bg-dark ">
					<Modal.Title className="text-white">{food?.categoria.nombre}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row ">
						<div className=" col-md-12 col-lg-7   text-center ">
							<img
								className=""
								style={{
									height: '490px',
									//objectFit: 'cover',
								}}
								src={selectedImage || nodisponible}
								alt="Pizza"
							/>
						</div>
						<div className=" col-md-12 col-lg-5  pt-4 pt-lg-0 ">
							<h4 className="product-titl text-dark">{food?.nombre}</h4>
							<span className="h4 fw-normal text-accent my-5">S/ {food?.precio}</span>
							<div className="my-4 d-flex align-items-center ">
								<select
									className="form-select me-3"
									style={{ width: '50%' }}
									value={selectedValue}
									onChange={handleSelectChange}
								>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</select>
								<button
									className="btn btn-danger btn-shadow  w-100 py-1"
									type="submit"
									onClick={() => agregarCarro(food as FoodResponse)}
								>
									<i className="bi bi-cart3 fs-4 mx-2"></i>
									Agregar
								</button>
							</div>

							<h5 className="h6 mb-3 pb-3 border-bottom">
								<i className="bi bi-info-circle"></i> Informacion
							</h5>
							<h6 className="fs-sm mb-2">Descripcion:</h6>
							<p className="fs-sm">{food?.descripcion}</p>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
});
export default ModalFood;
