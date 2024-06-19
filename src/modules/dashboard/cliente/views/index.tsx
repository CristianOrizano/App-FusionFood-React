import useClientePaginatedSearch from '@/modules/pages/login/application/useClientePaginatedSearch';
import { ClienteFilter, ClienteResponse } from '@/modules/pages/login/domain';
import { FilterPage, PaginationRequest } from '@/modules/shared/domain';
import { createColumnHelper } from '@tanstack/react-table';
import { useFormik } from 'formik';
import perfil from '@/core/imagenes/profile.png';
import React, { MouseEvent, useState } from 'react';
import { Accordion, Badge, Col, Form, Row } from 'react-bootstrap';
import LoadingTable from '@/core/components/loading/LoadingTable';
import { TableCoreSelectPaginated } from '@/core/components/table';
import { ESTADO_DESHABILITAR, ESTADO_HABILITAR } from '@/core/constantes';
import { showAlertCondition } from '@/core/helpers/SwalHelper';
import useClienteDeleteById from '@/modules/pages/login/application/useClienteDeleteById';

const index = () => {
	// Hooks
	const [searchFilter, setSearchFilter] = useState<PaginationRequest<ClienteFilter>>({
		page: 1,
		perPage: 10,
		filter: {
			apellidos: '',
			nombres: '',
			correo: '',
		},
	});

	const { data: docData, isFetching: isFetchingCliente } = useClientePaginatedSearch(searchFilter);
	//---
	//formik
	const formik = useFormik<ClienteFilter>({
		initialValues: {
			apellidos: '',
			nombres: '',
			correo: '',
		},
		onSubmit: values => {
			setSearchFilter(prev => {
				return {
					...prev,
					page: 1,
					filter: {
						apellidos: values.apellidos,
						nombres: values.nombres,
						correo: values.correo,
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

	const { mutateAsync: mutateAsyncDelete } = useClienteDeleteById();
	// Methods
	const removeCliente = async (
		evt: MouseEvent<HTMLInputElement>,
		payload: ClienteResponse,
	): Promise<void> => {
		evt.preventDefault();
		const question = `¿Confirmar ${
			payload.estado === true ? ESTADO_DESHABILITAR : ESTADO_HABILITAR
		} ${payload.nombres}?`;

		showAlertCondition(question, async () => {
			await mutateAsyncDelete(payload.id);
		});
	};

	//definir-columnas
	const columnHelper = createColumnHelper<ClienteResponse>();

	const columns = [
		columnHelper.accessor('id', {
			header: 'ID',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('nombres', {
			header: 'Nombres',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('apellidos', {
			header: 'Apellidos',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('fechaNacimiento', {
			header: 'Fecha Nacimiento',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('telefono', {
			header: 'Telefono',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('correo', {
			header: 'Correo',
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
						<Form.Check
							type="switch"
							label=""
							defaultChecked={row.original.estado}
							onClick={evt => {
								void removeCliente(evt, row.original);
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
												name="nombres"
												value={formik.values?.nombres ?? ''}
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
												name="apellidos"
												value={formik.values?.apellidos ?? ''}
												onChange={formik.handleChange}
												onKeyUp={e => {
													if (e.key === 'Enter') formik.handleSubmit();
												}}
											/>
										</Form.Group>
									</Col>
									<Col xs={12} sm={4} md={3}>
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
											<Form.Label>Correo</Form.Label>
											<Form.Control
												type="text"
												placeholder="Ingrese Correo"
												name="correo"
												value={formik.values?.correo ?? ''}
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
						<div className="card-body">
							{isFetchingCliente ? (
								<LoadingTable />
							) : (
								<TableCoreSelectPaginated<ClienteResponse>
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
