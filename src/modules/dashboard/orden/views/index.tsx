import { FilterPage, PaginationRequest } from '@/modules/shared/domain';
import React, { createRef, useState } from 'react';
import { OrdenFilter } from '../domain/OrdenFilter';
import useOrdenPaginatedSearch from '../application/useOrdenPaginatedSearch';
import { useFormik } from 'formik';
import { createColumnHelper } from '@tanstack/react-table';
import { OrdenResponse } from '../domain/OrdenResponse';
import { Accordion, Badge, Col, Form, Row } from 'react-bootstrap';
import LoadingTable from '@/core/components/loading/LoadingTable';
import { TableCoreSelectPaginated } from '@/core/components/table';
import DetalleModal, { ModalDetalleRef } from './components/DetalleModal';
import Select from 'react-select';
import useEstadoPedidoFindAll from '../application/useEstadoPedidoFindAll';
import { pdfHojaResumen } from './components/ReporteOrden';

const index = () => {
	// Hooks
	const [searchFilter, setSearchFilter] = useState<PaginationRequest<OrdenFilter>>({
		page: 1,
		perPage: 10,
		filter: {
			tipoPago: '',
			estado: 0,
		},
	});

	const { data: docData, isFetching: isFetchingOrden } = useOrdenPaginatedSearch(searchFilter);
	const { data: dataEstado, isFetching: isFetchingEstados } = useEstadoPedidoFindAll();

	const modalRef = createRef<ModalDetalleRef>();
	//---
	//formik
	const formik = useFormik<OrdenFilter>({
		initialValues: {
			tipoPago: '',
			estado: 0,
		},
		onSubmit: values => {
			setSearchFilter(prev => {
				return {
					...prev,
					page: 1,
					filter: {
						tipoPago: values.tipoPago,
						estado: values.estado,
						fechaOrden: values.fechaOrden,
					},
				};
			});
		},
	});
	const dataEstados = dataEstado?.map(item => ({
		value: item.id,
		label: item.nombre ?? '',
	}));
	const dataTipoPago = [
		{ value: 'Tarjeta', label: 'Tarjeta' },
		{ value: 'Efectivo', label: 'Efectivo' },
	];

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
							className="btn  mx-2 text-white"
							style={{ background: '#666699' }}
							onClick={() => modalRef.current?.openModal(row.original.id, row.original)}
						>
							<i className="fa-solid fa-pen-to-square"></i> Detalle
						</button>
						<button
							type="button"
							className="btn  mx-2 text-white"
							style={{ background: '#D4477F' }}
							onClick={() => pdfHojaResumen(row.original.id, row.original)}
						>
							<i className="bi bi-filetype-pdf"></i> Reporte
						</button>
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
											<Form.Label>Fecha Orden</Form.Label>
											<Form.Control
												type="date"
												size="lg"
												placeholder="Ingrese Nombre"
												name="fechaOrden"
												value={formik.values?.fechaOrden ?? ''}
												onChange={formik.handleChange}
												onKeyUp={e => {
													if (e.key === 'Enter') formik.handleSubmit();
												}}
											/>
										</Form.Group>
									</Col>
									<Col xs={12} sm={4} md={3}>
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
											<Form.Label>Tipo Pago</Form.Label>
											<Select
												name="tipoPago"
												value={dataTipoPago?.find(
													option => option.value === formik.values.tipoPago,
												)}
												options={dataTipoPago ?? []}
												onChange={(option, target) => {
													void formik.setFieldValue(target?.name ?? '', option?.value);
													formik.handleSubmit();
												}}
												placeholder="Buscar"
												menuPlacement="auto"
												isClearable
											/>
										</Form.Group>
									</Col>
									<Col xs={12} sm={4} md={3}>
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
											<Form.Label>Estado</Form.Label>
											<Select
												name="estado"
												value={dataEstados?.find(option => option.value === formik.values.estado)}
												options={dataEstados ?? []}
												onChange={(option, target) => {
													void formik.setFieldValue(target?.name ?? '', option?.value);
													formik.handleSubmit();
												}}
												placeholder="Buscar"
												menuPlacement="auto"
												isClearable
											/>
										</Form.Group>
									</Col>
								</Row>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>

					<div className="card text-black m-0">
						<div className="card-body">
							{isFetchingOrden ? (
								<LoadingTable />
							) : (
								<TableCoreSelectPaginated<OrdenResponse>
									columns={columns}
									data={docData}
									goToPage={goToPage}
								/>
							)}
						</div>
					</div>
				</Col>
			</Row>
			<DetalleModal ref={modalRef} />
		</>
	);
};

export default index;
