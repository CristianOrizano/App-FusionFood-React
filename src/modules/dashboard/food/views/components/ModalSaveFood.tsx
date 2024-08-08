import { useFormik } from 'formik';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Button, Col, Form, Modal, ModalProps, Row } from 'react-bootstrap';
import { FoodRequest } from '../../domain';
import * as Yup from 'yup';
import { useFoodCreate, useFoodFindById, useFoodUpdate } from '../../application';
import Swal from 'sweetalert2';
import LoadingForm from '@/core/components/loading/LoadingForm';
import { useCategoriaListSimple } from '@/modules/dashboard/categorias/application';
import Select from 'react-select';

export interface ModalSaveFoodRef {
	openModal: (id?: number) => void;
	closeModal?: () => void;
}

const ModalSaveFood = forwardRef<ModalSaveFoodRef, ModalProps>((_, ref) => {
	// Attributes
	const [show, setShow] = useState<boolean>(false);
	const [id, setId] = useState<number>();

	//form - modal
	const formik = useFormik<FoodRequest>({
		initialValues: {
			precio: 0,
			nombre: '',
			descripcion: '',
			idCategoria: 0,
		},
		validationSchema: Yup.object().shape({
			precio: Yup.number()
				.required('precio es requerido')
				.typeError('El precio debe ser un número'),
			idCategoria: Yup.number()
				.positive('La Categoria es requerido')
				.required('Categoria es requerido')
				.typeError('El precio debe ser un número'),
			nombre: Yup.string().trim().nullable().required('Nombre es requerido'),
			descripcion: Yup.string().trim().nullable().required('Descripcion es requerido'),
		}),
		onSubmit: values => {
			void saveCategoria(values);
		},
	});

	// Hooks
	const { data: food, isFetching: isFetchingFood } = useFoodFindById(id);
	const { data: dataCategoria } = useCategoriaListSimple();
	const { mutateAsync: mutateAsyncCreate } = useFoodCreate();
	const { mutateAsync: mutateAsyncEdit } = useFoodUpdate();
	//____
	//combos
	const dataCategorias = dataCategoria?.map(option => ({
		value: option.id,
		label: option.nombre ?? '',
	}));

	useEffect(() => {
		if (food != null)
			void formik.setValues({
				precio: food.precio,
				nombre: food.nombre,
				descripcion: food.descripcion,
				idCategoria: food.categoria.id,
				nombreImg: food.nombreImg,
			});
	}, [food]);

	// Methods
	const openModal = (idd?: number): void => {
		setShow(true);
		setId(idd);
		// console.log('id', id);
	};

	const closeModal = (): void => {
		setShow(false);
		setId(undefined);
		formik.resetForm();
	};

	const saveCategoria = async (payload: FoodRequest): Promise<void> => {
		try {
			if (id != null) {
				await mutateAsyncEdit({ food: payload, id });
			} else {
				await mutateAsyncCreate(payload);
			}
			Swal.fire({
				title: 'Correcto!',
				text: 'Exito al guardar!',
				icon: 'success',
			});
			closeModal();
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Error al guardar',
			});
			console.log('Error', error);
		}
	};

	// ImperativeHandle
	useImperativeHandle(ref, () => {
		return {
			openModal,
			closeModal,
		};
	});

	return (
		<>
			<Modal show={show} onHide={closeModal} backdrop="static">
				<Modal.Header closeButton className="bg-danger ">
					<Modal.Title className="text-white">Food</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{isFetchingFood ? (
						<LoadingForm />
					) : (
						<Row className="g-3">
							<Col xs={12}>
								<Form.Label>Nombre</Form.Label>
								<Form.Control
									type="text"
									name="nombre"
									placeholder="Ingrese Nombre"
									value={formik.values.nombre ?? ''}
									onChange={formik.handleChange}
								/>
								{(formik.touched.nombre ?? false) && formik.errors.nombre != null && (
									<small className="text-danger">{formik.errors.nombre}</small>
								)}
							</Col>
							<Col xs={12}>
								<Form.Label>Descripcion</Form.Label>
								<Form.Control
									type="text"
									name="descripcion"
									placeholder="Ingrese Descripcion"
									value={formik.values.descripcion ?? ''}
									onChange={formik.handleChange}
								/>
								{(formik.touched.descripcion ?? false) && formik.errors.descripcion != null && (
									<small className="text-danger">{formik.errors.descripcion}</small>
								)}
							</Col>

							<Col xs={12}>
								<Form.Label>Precio</Form.Label>
								<Form.Control
									type="text"
									name="precio"
									placeholder="Ingrese Precio"
									value={formik.values.precio ?? ''}
									onChange={formik.handleChange}
								/>
								{(formik.touched.precio ?? false) && formik.errors.precio != null && (
									<small className="text-danger">{formik.errors.precio}</small>
								)}
							</Col>
							<Col xs={12}>
								<Form.Label>Categoria</Form.Label>
								<Select
									className="react__select react__select__sm"
									name="idCategoria"
									value={
										dataCategorias &&
										dataCategorias.find(option => option.value === formik.values.idCategoria)
									}
									options={dataCategorias ?? []}
									onChange={(option, target) => {
										void formik.setFieldValue(target?.name ?? '', option?.value);
										console.log('select', option?.value);
									}}
									placeholder="Buscar"
									menuPlacement="auto"
									isClearable
								/>
								{(formik.touched.idCategoria ?? false) && formik.errors.idCategoria != null && (
									<small className="text-danger">{formik.errors.idCategoria}</small>
								)}
							</Col>
						</Row>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => {
							formik.handleSubmit();
						}}
					>
						Guardar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
});

export default ModalSaveFood;
