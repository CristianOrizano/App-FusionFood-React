import { FilterPage, PaginationRequest } from '@/modules/shared/domain';
import { MouseEvent, createRef, useState } from 'react';
import { FoodFilter, FoodResponse } from '../domain';

import { useFormik } from 'formik';
import { useFoodDeleteById, useFoodPaginatedSearch } from '../application';
import { ESTADO_DESHABILITAR, ESTADO_HABILITAR } from '@/core/constantes';
import { showAlertCondition } from '@/core/helpers/SwalHelper';
import ModalSaveFood, { ModalSaveFoodRef } from './components/ModalSaveFood';
import { createColumnHelper } from '@tanstack/react-table';
import { Accordion, Badge, Col, Form, Row } from 'react-bootstrap';
import LoadingTable from '@/core/components/loading/LoadingTable';
import { TableCoreSelectPaginated } from '@/core/components/table';
import { useCategoriaListSimple } from '../../categorias/application';
import Select from 'react-select';
import ModalPhotoSave, { ModalPhotoSaveRef } from './components/ModalPhotoSave';

import upload from '@/core/imagenes/upload.jpg';
import PaginationLinks from '@/core/components/table/PaginationLinks';

const index = () => {
	// Hooks

	const [searchFilter, setSearchFilter] = useState<PaginationRequest<FoodFilter>>({
		page: 1,
		perPage: 10,
		filter: {
			precio: 0,
			descripcion: '',
			nombre: '',
			idCategoria: 0,
		},
	});
	const { data: dataCategoria, isFetching: isFetchingCategoria } = useCategoriaListSimple();
	const { mutateAsync: mutateAsyncDelete } = useFoodDeleteById();
	const { data: docData, isFetching: isFetchingFood } = useFoodPaginatedSearch(searchFilter);
	//---
	//formik
	const formik = useFormik<FoodFilter>({
		initialValues: {
			descripcion: '',
			nombre: '',
			//precio: 0,
			idCategoria: 0,
		},
		onSubmit: values => {
			setSearchFilter(prev => {
				return {
					...prev,
					page: 1,
					filter: {
						nombre: values.nombre,
						descripcion: values.descripcion,
						precio: values.precio,
						idCategoria: values.idCategoria,
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

	// _____

	//combos
	const dataCategorias = dataCategoria?.map(option => ({
		value: option.id,
		label: option.nombre ?? '',
	}));

	// Methods
	const removeFood = async (
		evt: MouseEvent<HTMLInputElement>,
		payload: FoodResponse,
	): Promise<void> => {
		evt.preventDefault();

		const question = `¿Confirmar ${
			payload.estado === true ? ESTADO_DESHABILITAR : ESTADO_HABILITAR
		} ${payload.descripcion}?`;

		showAlertCondition(question, async () => {
			await mutateAsyncDelete(payload.id);
		});
	};

	const modalRef = createRef<ModalSaveFoodRef>();
	const modalPhotoRef = createRef<ModalPhotoSaveRef>();

	//definir-columnas
	const columnHelper = createColumnHelper<FoodResponse>();

	const columns = [
		columnHelper.accessor('id', {
			header: 'ID',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('nombre', {
			header: 'Nombre',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('descripcion', {
			header: 'Descripción',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('precio', {
			header: 'Precio',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('categoria.nombre', {
			header: 'Categoria',
			cell: info => info.getValue(),
		}),
		columnHelper.display({
			id: 'Imagen',
			header: () => <span className="d-block text-center text-nowrap">Imagen</span>,
			cell: ({ row }) => {
				return (
					<div className="text-center">
						<img src={row.original.imgFire || upload} style={{ width: '50px', height: '50px' }} />
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
							onClick={() => modalRef.current?.openModal(row.original.id)}
						>
							<i className="fa-solid fa-pen-to-square"></i>
						</button>
						<button
							type="button"
							className="btn btn-warning  mx-2"
							onClick={() => modalPhotoRef.current?.openModal(row.original.id)}
						>
							<i className="fa-solid fa-image"></i>
						</button>
						<Form.Check
							type="switch"
							label=""
							defaultChecked={row.original.estado}
							onClick={evt => {
								void removeFood(evt, row.original);
							}}
						/>
					</span>
				);
			},
		}),
	];
	const reset = (): void => {
		const ms: string | undefined = formik.values.precio?.toString();
		if (ms === '') {
			formik.resetForm();
			formik.handleSubmit();
		} else {
			formik.handleSubmit();
		}
	};

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
											<Form.Label>Descripcion</Form.Label>
											<Form.Control
												type="text"
												placeholder="Ingrese Descripcion"
												name="descripcion"
												value={formik.values?.descripcion ?? ''}
												onChange={formik.handleChange}
												onKeyUp={e => {
													if (e.key === 'Enter') formik.handleSubmit();
												}}
											/>
										</Form.Group>
									</Col>
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
											<Form.Label>Precio</Form.Label>
											<Form.Control
												type="text"
												placeholder="Ingrese Precio"
												name="precio"
												value={formik.values?.precio ?? ''}
												onChange={formik.handleChange}
												onKeyUp={e => {
													if (e.key === 'Enter') reset();
												}}
											/>
										</Form.Group>
									</Col>
									<Col xs={12} sm={4} md={3}>
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
						<div className="card-header m-0">
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => modalRef.current?.openModal()}
							>
								Registrar
							</button>
						</div>

						<div className="card-body">
							{isFetchingFood ? (
								<LoadingTable />
							) : (
								<TableCoreSelectPaginated<FoodResponse>
									columns={columns}
									data={docData}
									goToPage={goToPage}
								/>
							)}
						</div>
					</div>
				</Col>
			</Row>
			<ModalSaveFood ref={modalRef} />
			<ModalPhotoSave ref={modalPhotoRef} />
		</>
	);
};

export default index;
