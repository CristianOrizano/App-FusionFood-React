import NavbarPage from '@/modules/shared/navbar/NavbarPage';
import cards from '@/core/imagenes/cards.png';
import '../../../../layouts/views/static/css/theme.min2.css';
import * as Yup from 'yup';
import { useCart } from '@/modules/dashboard/food/application/useCar';
import { LocalStorageSessionCliente } from '@/core/sessions';
import { DetalleOrden, OrdenRequest } from '@/modules/dashboard/orden/domain/OrdenRequest';
import { useFormik } from 'formik';
import useOrdenRegistrar from '@/modules/dashboard/orden/application/useOrdenRegistrar';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { FadeLoader, PulseLoader, ScaleLoader, SyncLoader } from 'react-spinners';

const cuenta = () => {
	const navigate = useNavigate();

	const { carritoLista: data, clearCart, total } = useCart();
	const ClienteAuth = LocalStorageSessionCliente.getAuthorization();
	const { mutateAsync: mutateAsyncCreate } = useOrdenRegistrar();
	const [loading, setLoading] = useState(false);
	const formik = useFormik({
		initialValues: {
			direccion: '',
			tipoPago: 'Tarjeta',
			comentario: '',
		},
		validationSchema: Yup.object().shape({
			direccion: Yup.string().trim().nullable().required('Direccion es requerido'),
			tipoPago: Yup.string().trim().nullable().required('TipoPago es requerido'),
			comentario: Yup.string().trim().nullable().required('Comentario es requerido'),
		}),
		onSubmit: values => {
			void ProcesarPago(values);
		},
	});
	const ProcesarPago = async (values: any): Promise<void> => {
		const totalPagar: number = Number(total().replace('S/', '')) + 6.0;

		const detalles: DetalleOrden[] = data.map(item => {
			const detalleorden: DetalleOrden = {
				idFood: item.id,
				cantidad: item.cantidad,
			};
			return detalleorden;
		});

		const orden: OrdenRequest = {
			idCliente: ClienteAuth.id,
			total: totalPagar,
			direccion: values.direccion,
			tipoPago: values.tipoPago,
			comentario: values.comentario,
			detalleOrdens: detalles,
		};
		await mutateAsyncCreate(orden);

		setLoading(true);
		setTimeout(() => {
			clearCart();
			Swal.fire({
				title: 'Correcto!',
				text: 'Exito al guardar!',
				icon: 'success',
			});
			setLoading(false);
			navigate('/profile');
		}, 3000);
	};
	return (
		<>
			<main className="page-wrapper">
				<NavbarPage />
				<div style={{ paddingTop: '60px', paddingBottom: '150px' }}>
					<div className="container mt-5 mb-5">
						<h3>Datos </h3>
						<div className="row">
							<div className="col-md-7 ">
								<div className="row ">
									<div className="col-12 col-md-6">
										<div className="mb-3">
											<label className="form-label">Nombres</label>
											<input
												className="form-control"
												name="nombres"
												type="text"
												value={ClienteAuth.nombres}
												disabled
												placeholder="Ingrese Nombres"
											/>
										</div>
									</div>
									<div className="col-12 col-md-6">
										<div className="mb-3">
											<label className="form-label">Apellidos</label>
											<input
												className="form-control"
												name="apellidos"
												type="text"
												value={ClienteAuth.apellidos}
												disabled
												placeholder="Ingrese Apellidos"
											/>
										</div>
									</div>
									<div className="col-12 col-md-6">
										<div className="mb-3">
											<label className="form-label">Correo</label>
											<input
												className="form-control"
												name="correo"
												type="text"
												value={ClienteAuth.correo}
												disabled
												placeholder="Ingrese Correo"
											/>
										</div>
									</div>
									<div className="col-12 col-md-6">
										<div className="mb-3">
											<label className="form-label">Telefono</label>
											<input
												className="form-control"
												name="telefono"
												type="number"
												value={ClienteAuth.telefono ?? ''}
												disabled
												placeholder="Ingrese Telefono"
											/>
										</div>
									</div>

									<div className="col-12 col-md-12">
										<div className="mb-3">
											<label className="form-label">Direccion</label>
											<input
												className="form-control"
												name="direccion"
												type="text"
												placeholder="Ingrese Direccion"
												value={formik.values.direccion ?? ''}
												onChange={formik.handleChange}
											/>
											{(formik.touched.direccion ?? false) && formik.errors.direccion != null && (
												<small className="text-danger">{formik.errors.direccion}</small>
											)}
										</div>
									</div>
									<div className="col-12 col-md-12">
										<div className="mb-3">
											<label className="form-label">Comentarios</label>
											<textarea
												className="form-control"
												name="comentario"
												placeholder="Ingrese Comentarios"
												value={formik.values.comentario ?? ''}
												onChange={formik.handleChange}
											/>
											{(formik.touched.comentario ?? false) && formik.errors.comentario != null && (
												<small className="text-danger">{formik.errors.comentario}</small>
											)}
										</div>
									</div>

									<div className="col-12 mb-4 mb-sm-0">
										<h2 className="h5 pb-2">Metodo de Pago</h2>
										<div className="form-check form-check-inline mb-3">
											<input
												className="form-check-input"
												type="radio"
												name="tipoPago"
												value="Efectivo"
												checked={formik.values.tipoPago === 'Efectivo'}
												onChange={formik.handleChange}
											/>
											<label className="form-check-label">Pagar en efectivo</label>
										</div>

										<h2 className="h5 mt-3 pt-4 pb-2">Pago con tarjeta</h2>
										<div className="form-check form-check-inline pb-4">
											<input
												className="form-check-input"
												type="radio"
												name="tipoPago"
												value="Tarjeta"
												checked={formik.values.tipoPago === 'Tarjeta'}
												onChange={formik.handleChange}
											/>
											<label className="form-check-label">
												Paga con
												<img
													className="d-inline-block align-middle"
													src={cards}
													alt="Cerdit Cards"
													style={{ width: '187px' }}
												/>
											</label>
										</div>

										<button
											className="btn btn-success d-block w-100 mt-3"
											type="submit"
											onClick={() => {
												formik.handleSubmit();
											}}
										>
											Complete order
										</button>
									</div>
								</div>
							</div>
							<div className="col-md-5 bg-secondary p-3">
								<h5 className="text-center text-dark">Resumen de Orden</h5>
								<hr style={{ border: '1px solid #44D8C2' }} />
								<div className="overflow-auto  px-4 py-2" style={{ maxHeight: '415px' }}>
									{data.map((item, index) => (
										<div className="row align-items-center  " key={index}>
											<div className="col-7">
												<div className="card mb-2 ">
													<div className="row g-0 align-items-center">
														<div className="col-4  ">
															<img
																src={item.imgFire}
																className="img-fluid rounded-start "
																style={{ objectFit: 'cover' }}
															/>
														</div>
														<div className="col-8 px-1">
															<p>
																<small className="card-text">{item.nombre}</small>
																<br />
																<small className="card-text">
																	<strong>Precio:</strong>{' '}
																	{item.precio.toLocaleString('es-PE', {
																		style: 'currency',
																		currency: 'PEN',
																	})}
																</small>
																<br />
																<small className="card-text">
																	<strong>Cantidad:</strong> {item.cantidad}
																</small>
															</p>
														</div>
													</div>
												</div>
											</div>
											<div className="col-5 text-center ">
												<p>
													{(item.precio * item.cantidad).toLocaleString('es-PE', {
														style: 'currency',
														currency: 'PEN',
													})}
												</p>
											</div>
										</div>
									))}
								</div>
								<hr style={{ border: '1px solid #44D8C2' }} />
								<div className="row  px-4 py-2">
									<div className="col-6">
										<p className="fw-bold">Delivery</p>
									</div>
									<div className="col-6 text-center">
										<p>S/ 6.00</p>
									</div>

									<div className="col-6">
										<p className="fw-bold">SubTotal</p>
									</div>
									<div className="col-6 text-center">
										<p> {total()}</p>
									</div>
								</div>

								<div className="row  px-4 py-2">
									<hr style={{ border: '1px solid #44D8C2' }} />
									<div className="col-6">
										<p className="fw-bold">Total</p>
									</div>
									<div className="col-6 text-center">
										<p>
											{(Number(total().replace('S/', '')) + 6.0).toLocaleString('es-PE', {
												style: 'currency',
												currency: 'PEN',
											})}
										</p>
									</div>
								</div>
							</div>
						</div>
						{loading && (
							<div className="spinner-overlay">
								<PulseLoader size={30} color="#f2f3f4" loading={loading} />
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default cuenta;
