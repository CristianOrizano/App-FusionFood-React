import FooterPage from '@/modules/shared/navbar/FooterPage';
import NavbarPage from '@/modules/shared/navbar/NavbarPage';
import '../../../layouts/views/static/css/theme.min2.css';
import perfil from '../../../core/imagenes/profile.png';
import { Badge, Tab, Tabs } from 'react-bootstrap';
import { useFormik } from 'formik';
import { ClienteRequest } from '../login/domain';
import * as Yup from 'yup';
import { LocalStorageSessionCliente } from '@/core/sessions';
import { createRef, useEffect, useState } from 'react';
import ModalPhotoCliente, { ModalPhotoClienteSaveRef } from './components/ModalPhotoCliente';
import { getPhoto } from '@/core/firebase/config';
import { createColumnHelper } from '@tanstack/react-table';
import { OrdenResponse } from '@/modules/dashboard/orden/domain/OrdenResponse';
import { FilterPage, PaginationRequest } from '@/modules/shared/domain';
import { OrdenFilter } from '@/modules/dashboard/orden/domain/OrdenFilter';
import useOrdenPaginatedSearch from '@/modules/dashboard/orden/application/useOrdenPaginatedSearch';
import LoadingTable from '@/core/components/loading/LoadingTable';
import { TableCoreSelectPaginated } from '@/core/components/table';
import { pdfHojaResumen } from '@/modules/dashboard/orden/views/components/ReporteOrden';

const index = () => {
	const ClienteAuth = LocalStorageSessionCliente.getAuthorization();
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const modalPhotoRef = createRef<ModalPhotoClienteSaveRef>();

	const formikRegister = useFormik<ClienteRequest>({
		initialValues: {
			nombres: ClienteAuth.nombres,
			apellidos: ClienteAuth.apellidos,
			fechaNacimiento: '2001-10-10',
			telefono: ClienteAuth.telefono,
			correo: ClienteAuth.correo,
			contrasena: ClienteAuth.contrasena,
		},
		validationSchema: Yup.object({
			nombres: Yup.string().required('nombres es requerido'),
			apellidos: Yup.string().required('apellidos es requerido'),
			fechaNacimiento: Yup.string().required('Fecha es requerido'),
			correo: Yup.string().required('correo es requerido'),
			contrasena: Yup.string().required('contrasena es requerido'),
		}),
		onSubmit: (values: ClienteRequest) => {
			console.log('Values: ', values);
			// void registrar(values);
		},
	});
	// Hooks
	const [searchFilter, setSearchFilter] = useState<PaginationRequest<OrdenFilter>>({
		page: 1,
		perPage: 10,
		filter: {
			tipoPago: '',
			idCliente: ClienteAuth.id,
			estado: 0,
		},
	});
	const { data: docData, isFetching: isFetchingOrden } = useOrdenPaginatedSearch(searchFilter);

	useEffect(() => {
		if (ClienteAuth?.nimagen != null) {
			getPhoto(ClienteAuth.nimagen, 'cliente')
				.then(url => {
					setSelectedImage(url); // Actualiza el estado con la URL de la imagen
				})
				.catch(error => {
					console.error('Error al obtener la URL de la imagen:', error);
					// Maneja el error si ocurre
				});
		}
	}, [ClienteAuth]);

	const goToPage = (payload: FilterPage): void => {
		console.log('payload', payload);
		setSearchFilter({
			...searchFilter,
			page: payload.page,
			perPage: payload.perPage,
		});
	};
	const estadosColores: any = {
		Pendiente: 'warning', // Amarillo
		'En Proceso': 'primary', // Azul
		Entregado: 'success', // Verde
		Cancelado: 'danger', // Rojo
	};

	//definir-columnas
	const columnHelper = createColumnHelper<OrdenResponse>();

	const columns = [
		columnHelper.accessor('id', {
			header: 'ID',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('fechaOrden', {
			header: 'Fecha Orden',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('cliente.nombres', {
			header: 'Cliente',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('total', {
			header: 'Monto Total',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('direccion', {
			header: 'Direccion',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('tipoPago', {
			header: 'TipoPago',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('estadoPedido.nombre', {
			header: 'Estado',
			cell: ({ row }) => {
				const estado = row.original.estadoPedido.nombre;
				const color = estadosColores[estado] || 'secondary';
				return (
					<div className="text-center">
						<Badge pill bg={color}>
							{row.original.estadoPedido.nombre}
						</Badge>
					</div>
				);
			},
		}),
		columnHelper.display({
			id: 'acciones',
			header: () => <span className="d-block text-center text-nowrap">Acciones</span>,
			cell: ({ row }) => {
				return (
					<span className="d-flex align-items-center justify-content-center">
						<button
							type="button"
							className="btn  mx-2 text-dark"
							onClick={() => pdfHojaResumen(row.original.id, row.original)}
						>
							<i className="bi bi-file-earmark-pdf-fill fs-4"></i>
						</button>
					</span>
				);
			},
		}),
	];

	return (
		<>
			<main className="page-wrapper">
				<NavbarPage />
				<div style={{ paddingTop: '100px', paddingBottom: '150px' }}>
					<div className="container mt-5 mb-5">
						<div className="text-center ">
							<img
								className="rounded-pill border border-dark"
								src={selectedImage || perfil}
								width="120"
							/>
							<p>
								<a onClick={() => modalPhotoRef.current?.openModal(ClienteAuth.id)}>
									<i className="bi bi-pencil-square"></i> edit
								</a>
							</p>
						</div>
						<Tabs defaultActiveKey="home" id="fill-tab-example" className="mb-3" fill>
							<Tab eventKey="home" title="Perfil">
								<form onSubmit={formikRegister.handleSubmit}>
									<div className="row ">
										<div className="col-12 col-md-6">
											<div className="mb-3">
												<label className="form-label">Nombres</label>
												<input
													className="form-control"
													name="nombres"
													type="text"
													placeholder="Ingrese Nombres"
													value={formikRegister.values.nombres}
													onChange={formikRegister.handleChange}
												/>
												{(formikRegister.touched.nombres ?? false) &&
													formikRegister.errors.nombres != null && (
														<small className="text-danger">{formikRegister.errors.nombres}</small>
													)}
											</div>
										</div>
										<div className="col-12 col-md-6">
											<div className="mb-3">
												<label className="form-label">Apellidos</label>
												<input
													className="form-control"
													name="apellidos"
													type="text"
													placeholder="Ingrese Apellidos"
													value={formikRegister.values.apellidos}
													onChange={formikRegister.handleChange}
												/>
												{(formikRegister.touched.apellidos ?? false) &&
													formikRegister.errors.apellidos != null && (
														<small className="text-danger">{formikRegister.errors.apellidos}</small>
													)}
											</div>
										</div>

										<div className="col-12 col-md-6">
											<div className="mb-3">
												<label className="form-label">Telefono</label>
												<input
													className="form-control"
													name="telefono"
													type="number"
													placeholder="Ingrese Telefono"
													value={formikRegister.values.telefono ?? ''}
													onChange={formikRegister.handleChange}
												/>
												{(formikRegister.touched.telefono ?? false) &&
													formikRegister.errors.telefono != null && (
														<small className="text-danger">{formikRegister.errors.telefono}</small>
													)}
											</div>
										</div>
										<div className="col-12 col-md-6">
											<div className="mb-3">
												<label className="form-label">Fecha Nacimiento</label>
												<input
													className="form-control"
													name="fechaNacimiento"
													type="date"
													placeholder="Ingrese Fecha"
													value={formikRegister.values.fechaNacimiento ?? ''}
													onChange={formikRegister.handleChange}
												/>
												{(formikRegister.touched.fechaNacimiento ?? false) &&
													formikRegister.errors.fechaNacimiento != null && (
														<small className="text-danger">
															{formikRegister.errors.fechaNacimiento}
														</small>
													)}
											</div>
										</div>
										<div className="col-12 col-md-6">
											<div className="mb-3">
												<label className="form-label">Correo</label>
												<input
													className="form-control"
													name="correo"
													type="text"
													placeholder="Ingrese Correo"
													value={formikRegister.values.correo}
													onChange={formikRegister.handleChange}
												/>
												{(formikRegister.touched.correo ?? false) &&
													formikRegister.errors.correo != null && (
														<small className="text-danger">{formikRegister.errors.correo}</small>
													)}
											</div>
										</div>
										<div className="col-12 col-md-6">
											<div className="mb-3">
												<label className="form-label">Contraseña</label>
												<input
													className="form-control"
													name="contrasena"
													type="text"
													placeholder="Ingrese Contraseña"
													value={formikRegister.values.contrasena}
													onChange={formikRegister.handleChange}
												/>
												{(formikRegister.touched.contrasena ?? false) &&
													formikRegister.errors.contrasena != null && (
														<small className="text-danger">
															{formikRegister.errors.contrasena}
														</small>
													)}
											</div>
										</div>
										<div className="row justify-content-center mt-5">
											<div className="col-12 col-md-6 ">
												<div className="d-flex d-grid gap-2">
													<button className="btn btn-danger flex-grow-1" type="button">
														Guadar
													</button>
													<button className="btn btn-info flex-grow-1" type="button">
														Editar
													</button>
												</div>
											</div>
										</div>
									</div>
								</form>
							</Tab>
							<Tab eventKey="profile" title="Historial Ordenes">
								{isFetchingOrden ? (
									<LoadingTable />
								) : (
									<TableCoreSelectPaginated<OrdenResponse>
										columns={columns}
										data={docData}
										goToPage={goToPage}
									/>
								)}
							</Tab>
						</Tabs>
					</div>
				</div>
				<FooterPage />
			</main>

			<ModalPhotoCliente ref={modalPhotoRef} />
		</>
	);
};

export default index;
