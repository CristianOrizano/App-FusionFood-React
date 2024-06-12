import { FilterPage, PaginationRequest } from '@/modules/shared/domain';
import React, { useState } from 'react';
import { UsuarioFilter, UsuarioResponse } from '../domain';
import { useUsuarioPaginated } from '../application';
import { useFormik } from 'formik';
import { Accordion, Badge, Col, Form, Row } from 'react-bootstrap';
import LoadingTable from '@/core/components/loading/LoadingTable';
import { createColumnHelper } from '@tanstack/react-table';
import perfil from '@/core/imagenes/profile.png';
import { TableCoreSelectPaginated } from '@/core/components/table';

const index = () => {
	// Hooks
	const [searchFilter, setSearchFilter] = useState<PaginationRequest<UsuarioFilter>>({
		page: 1,
		perPage: 10,
		filter: {
			apellido: '',
			nombre: '',
			email: '',
		},
	});

	const { data: docData, isFetching: isFetchingUsuario } = useUsuarioPaginated(searchFilter);
	//---
	//formik
	const formik = useFormik<UsuarioFilter>({
		initialValues: {
			apellido: '',
			nombre: '',
			email: '',
		},
		onSubmit: values => {
			setSearchFilter(prev => {
				return {
					...prev,
					page: 1,
					filter: {
						apellido: values.nombre,
						nombre: values.nombre,
						email: values.email,
					},
				};
			});
		},
	});

	const goToPage = (payload: FilterPage): void => {
		console.log('payload', payload);
		setSearchFilter({
			...searchFilter,
			page: payload.page,
			perPage: payload.perPage,
		});
	};

	//definir-columnas
	const columnHelper = createColumnHelper<UsuarioResponse>();

	const columns = [
		columnHelper.accessor('id', {
			header: 'ID',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('nombre', {
			header: 'Nombre',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('apellido', {
			header: 'Apellido',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('email', {
			header: 'Email',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('username', {
			header: 'Username',
			cell: info => info.getValue(),
		}),

		columnHelper.display({
			id: 'Imagen',
			header: () => <span className="d-block text-center text-nowrap">Imagen</span>,
			cell: ({ row }) => {
				return (
					<div className="text-center">
						<img src={row.original.imgFire || perfil} style={{ width: '50px', height: '50px' }} />
					</div>
				);
			},
		}),

		columnHelper.accessor('estado', {
			header: () => (
				// Utilizamos una función para retornar el encabezado
				<div className="text-center">Estado</div> // El encabezado centrado
			),
			cell: ({ row }) => (
				<div className="text-center">
					<Badge pill bg={row.original.estado ? 'success' : 'danger'}>
						{row.original.estado ? 'Activo' : 'Inactivo'}
					</Badge>
				</div>
			),
		}),

		columnHelper.display({
			id: 'acciones',
			header: () => <span className="d-block text-center text-nowrap">Acciones</span>,
			cell: ({ row }) => {
				return (
					<span className="d-flex align-items-center justify-content-center">
						<button
							type="button"
							className="btn btn-info  mx-2"
							// onClick={() => modalRef.current?.openModal(row.original.id)}
						>
							<i className="fa-solid fa-pen-to-square"></i>
						</button>
						<button
							type="button"
							className="btn btn-warning  mx-2"
							// onClick={() => modalPhotoRef.current?.openModal(row.original.id)}
						>
							<i className="fa-solid fa-image"></i>
						</button>
						<Form.Check
							type="switch"
							label=""
							defaultChecked={row.original.estado}
							onClick={evt => {
								// void removeFood(evt, row.original);
							}}
						/>
					</span>
				);
			},
		}),
	];

	return (
		<>
			<Row>
				<Col>
					<Accordion defaultActiveKey="0">
						<Accordion.Item eventKey="0">
							<Accordion.Header>Filtro de busqueda</Accordion.Header>

							<Accordion.Body>
								<Row>
									<div className="d-flex justify-content-end">
										<div>
											<button
												type="button"
												className="btn btn-outline-dark"
												onClick={formik.handleReset}
											>
												Limpiar
											</button>{' '}
											<button
												type="button"
												className="btn btn-outline-primary"
												onClick={() => {
													formik.handleSubmit();
												}}
											>
												Buscar
											</button>
										</div>
									</div>
									<Col xs={12} sm={4} md={3}>
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
											<Form.Label>Nombre</Form.Label>
											<Form.Control
												type="text"
												placeholder="Ingrese Nombre"
												name="nombre"
												value={formik.values?.nombre ?? ''}
												onChange={formik.handleChange}
												onKeyUp={e => {
													if (e.key === 'Enter') formik.handleSubmit();
												}}
											/>
										</Form.Group>
									</Col>
									<Col xs={12} sm={4} md={3}>
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
											<Form.Label>Apellido</Form.Label>
											<Form.Control
												type="text"
												placeholder="Ingrese Apellido"
												name="apellido"
												value={formik.values?.apellido ?? ''}
												onChange={formik.handleChange}
												onKeyUp={e => {
													if (e.key === 'Enter') formik.handleSubmit();
												}}
											/>
										</Form.Group>
									</Col>
								</Row>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>

					<div className="card text-black m-0">
						<div className="card-header m-0">
							<button
								type="button"
								className="btn btn-primary"
								// onClick={() => modalRef.current?.openModal()}
							>
								Registrar
							</button>
						</div>

						<div className="card-body">
							{isFetchingUsuario ? (
								<LoadingTable />
							) : (
								<TableCoreSelectPaginated<UsuarioResponse>
									columns={columns}
									data={docData}
									goToPage={goToPage}
								/>
							)}
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default index;
