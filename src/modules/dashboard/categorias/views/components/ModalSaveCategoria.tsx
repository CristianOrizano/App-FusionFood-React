import { useFormik } from 'formik';
import { ReactNode, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { CategoriaRequest } from '../../domain';
import * as Yup from 'yup';
import { useCategoriaCreate, useCategoriaFindById, useCategoriaUpdate } from '../../application';
import Swal from 'sweetalert2';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import LoadingForm from '@/core/components/loading/LoadingForm';

interface ModalProps {
	children?: ReactNode;
}

export interface ModalSaveCategoriaRef {
	openModal: (id?: number) => void;
	closeModal?: () => void;
}

const ModalSaveCategoria = forwardRef<ModalSaveCategoriaRef, ModalProps>((_, ref) => {
	// Attributes
	const [show, setShow] = useState<boolean>(false);
	const [id, setId] = useState<number>();

	//form - modal
	const formik = useFormik<CategoriaRequest>({
		initialValues: {
			nombre: '',
			descripcion: '',
		},
		validationSchema: Yup.object().shape({
			nombre: Yup.string().trim().nullable().required('Nombre es requerido'),
			descripcion: Yup.string().trim().nullable().required('Descripcion es requerido'),
		}),
		onSubmit: values => {
			void saveCategoria(values);
		},
	});

	// Hooks
	const { data: categoria, isFetching: isFetchingCategoria } = useCategoriaFindById(id);
	const { mutateAsync: mutateAsyncCreate } = useCategoriaCreate();
	const { mutateAsync: mutateAsyncEdit } = useCategoriaUpdate();

	useEffect(() => {
		// console.log('laboratorio', laboratorio);
		if (categoria != null)
			void formik.setValues({
				nombre: categoria.nombre,
				descripcion: categoria.descripcion,
				nombreImg: categoria.nombreImg,
			});
	}, [categoria]);

	// Methods
	const openModal = (id?: number): void => {
		setShow(true);
		setId(id);
		// console.log('id', id);
	};

	const closeModal = (): void => {
		setShow(false);
		setId(undefined);
		formik.resetForm();
	};

	const saveCategoria = async (payload: CategoriaRequest): Promise<void> => {
		try {
			if (id != null) {
				await mutateAsyncEdit({ id, categoria: payload });
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
				<Modal.Header closeButton className="bg-info ">
					<Modal.Title className="text-white">Categoria</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{isFetchingCategoria ? (
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
								<Form.Label>Descripción</Form.Label>
								<Form.Control
									type="text"
									name="descripcion"
									placeholder="Ingrese Descripción"
									value={formik.values.descripcion ?? ''}
									onChange={formik.handleChange}
								/>
								{(formik.touched.descripcion ?? false) && formik.errors.descripcion != null && (
									<small className="text-danger">{formik.errors.descripcion}</small>
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

export default ModalSaveCategoria;
