import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Button, Modal, ModalProps, Table } from 'react-bootstrap';
import { OrdenResponse } from '../../domain/OrdenResponse';
import useDetalleOrden from '../../application/useDetalleOrden';
import logo from '@/core/imagenes/logodetalle.png';
import useEstadoPedidoFindAll from '../../application/useEstadoPedidoFindAll';
import Select from 'react-select';
import { OrdenSave } from '../../domain/OrdenSave';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import useOrdenUpdate from '../../application/useOrdenUpdate';
import LoadingTable from '@/core/components/loading/LoadingTable';
export interface ModalDetalleRef {
	openModal: (id?: number, dataOrden?: OrdenResponse) => void;
	closeModal?: () => void;
}

const DetalleModal = forwardRef<ModalDetalleRef, ModalProps>((_, ref) => {
	// Attributes
	const [show, setShow] = useState<boolean>(false);
	const [ordenData, setOrdenData] = useState<OrdenResponse>();
	const [id, setId] = useState<number>();
	const [subTotal, setSubTotal] = useState<number>();
	const { data: ordenDetalle, isFetching } = useDetalleOrden(Number(id));
	const { data: dataEstados } = useEstadoPedidoFindAll();
	const { mutateAsync: mutateAsyncEdit } = useOrdenUpdate();

	// Methods
	const openModal = (id?: number, data?: OrdenResponse): void => {
		setShow(true);
		setOrdenData(data);
		//setEstadoPedidoId(data?.estadoPedido.id);
		setId(id);
	};

	const formik = useFormik<OrdenSave>({
		initialValues: {
			estado: 0,
		},
		validationSchema: Yup.object().shape({
			estado: Yup.number()
				.positive('La estado es requerido')
				.required('estado es requerido')
				.typeError('El estado debe ser un número'),
		}),
		onSubmit: values => {
			void saveEstado(values);
		},
	});

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
	const saveEstado = async (payload: OrdenSave): Promise<void> => {
		try {
			if (id != null) {
				await mutateAsyncEdit({ orden: payload, id });
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

	const dataEstadosPedido = dataEstados?.map(option => ({
		value: option.id,
		label: option.nombre ?? '',
	}));

	useEffect(() => {
		if (ordenData != null) {
			void formik.setValues({
				estado: ordenData.estadoPedido.id,
			});
		}
	}, [ordenData]);

	useEffect(() => {
		if (ordenDetalle != null) {
			let total = 0;
			for (const item of ordenDetalle) {
				const subtotal = item.cantidad * item.foodMenu.precio;
				total += subtotal;
			}

			const subTotalFor: string = total.toFixed(2);

			setSubTotal(Number(subTotalFor));
		}
	}, [ordenDetalle]);

	return (
		<>
			<Modal show={show} onHide={closeModal} backdrop="static" size="lg">
				<Modal.Header closeButton className="bg-danger">
					<Modal.Title className="text-white fw-bold">
						<img src={logo} width="100" />
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="bg-white">
					<div>
						<div className="row">
							<div className="col-6">
								<div className="mb-3 row">
									<label htmlFor="staticEmail" className="col-sm-2 col-form-label fw-bold">
										Cliente:
									</label>
									<div className="col-sm-10">
										<input
											type="text"
											readOnly
											className="form-control-plaintext"
											id="staticEmail"
											value={ordenData?.cliente.nombres + ' ' + ordenData?.cliente.apellidos}
										/>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className="mb-3 row">
									<label htmlFor="staticEmail" className="col-sm-2 col-form-label fw-bold">
										Telefono:
									</label>
									<div className="col-sm-10">
										<input
											type="text"
											readOnly
											className="form-control-plaintext"
											id="staticEmail"
											value={ordenData?.cliente.telefono ?? ''}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-6">
								<div className="mb-3 row">
									<label htmlFor="staticEmail" className="col-sm-2 col-form-label fw-bold">
										Fecha:
									</label>
									<div className="col-sm-10">
										<input
											type="text"
											readOnly
											className="form-control-plaintext"
											id="staticEmail"
											value={ordenData?.fechaOrden}
										/>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className="mb-3 row">
									<label htmlFor="staticEmail" className="col-sm-2 col-form-label fw-bold">
										Direccion:
									</label>
									<div className="col-sm-10">
										<input
											type="text"
											readOnly
											className="form-control-plaintext"
											id="staticEmail"
											value={ordenData?.direccion}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-6">
								<div className="mb-3 row">
									<label htmlFor="staticEmail" className="col-sm-2 col-form-label fw-bold">
										Comentarios:
									</label>
									<div className="col-sm-6  mx-4">
										<textarea
											readOnly
											className="form-control"
											id="exampleFormControlTextarea1"
											value={ordenData?.comentario}
										></textarea>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className="mb-3 row">
									<label htmlFor="staticEmail" className="col-sm-2 col-form-label fw-bold">
										EstadoPedido:
									</label>
									<div className="col-sm-6  mx-5">
										<Select
											name="estado"
											options={dataEstadosPedido ?? []}
											onChange={(option, target) => {
												void formik.setFieldValue(target?.name ?? '', option?.value);
											}}
											value={dataEstadosPedido?.find(
												option => option.value === formik.values.estado,
											)}
											placeholder="[Seleccione]"
											menuPlacement="auto"
											isClearable
										/>
										{(formik.touched.estado ?? false) && formik.errors.estado != null && (
											<small className="text-danger">{formik.errors.estado}</small>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
					<hr />

					{isFetching ? (
						<LoadingTable />
					) : (
						<Table responsive bordered hover size="sm" className="">
							<thead className="text-center">
								<tr className="bg-info text-white">
									<th className="text-white">Descripcion</th>
									<th className="text-white">Cantidad</th>
									<th className="text-white">Precio</th>
									<th className="text-white">Importe</th>
								</tr>
							</thead>
							<tbody>
								{ordenDetalle?.map((item, key) => (
									<tr key={key}>
										<td>
											<img
												src={item.imgFire}
												className="img-fluid mx-3"
												style={{ width: '45px', height: '45px' }}
											/>
											{item.foodMenu.nombre}
										</td>

										<td>{item.cantidad} </td>
										<td>
											{item.foodMenu.precio.toLocaleString('es-PE', {
												style: 'currency',
												currency: 'PEN',
											})}{' '}
										</td>
										<td>
											{(item.foodMenu.precio * item.cantidad).toLocaleString('es-PE', {
												style: 'currency',
												currency: 'PEN',
											})}
										</td>
									</tr>
								))}
								<tr>
									<td></td>
									<td></td>
									<td className="fw-bold"> SubTotal</td>
									<td>
										{subTotal?.toLocaleString('es-PE', {
											style: 'currency',
											currency: 'PEN',
										})}
									</td>
								</tr>
								<tr>
									<td></td>

									<td></td>
									<td className="fw-bold">Delivery </td>
									<td>{'S/ 6.00'}</td>
								</tr>
								<tr>
									<td></td>
									<td></td>
									<td className="fw-bold">Total </td>
									<td>
										{((subTotal ?? 0) + 6.0).toLocaleString('es-PE', {
											style: 'currency',
											currency: 'PEN',
										})}
									</td>
								</tr>
							</tbody>
						</Table>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeModal}>
						Cerrar
					</Button>
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
export default DetalleModal;
