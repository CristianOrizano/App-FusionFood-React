import { createColumnHelper } from '@tanstack/react-table';
import { CategoriaFilter, CategoriaResponse } from '../domain';
import { useCategoriaPaginatedSearch } from '../application';
import { MouseEvent, createRef, useState } from 'react';
import { FilterPage, PaginationRequest, RecordState } from '@/modules/shared/domain';
import { TableCoreSelectPaginated } from '@/core/components/table';
import LoadingTable from '@/core/components/loading/LoadingTable';
import { Badge, Col, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import ModalSaveCategoria, { ModalSaveCategoriaRef } from './components/ModalSaveCategoria';
import Select from 'react-select';
import { RECORD_STATUS } from '@/core/helpers/RecordStateHelper';
import { ESTADO_DESHABILITAR, ESTADO_HABILITAR } from '@/core/constantes';
import { showAlertCondition } from '@/core/helpers/SwalHelper';
import useCategoriaDeleteById from '../application/useCategoriaDeleteById';
import upload from '@/core/imagenes/upload.jpg';
import ModalPhotoSave, { ModalPhotoSaveRef } from './components/ModalPhotSave';

interface CategoriaFilterFormik extends CategoriaFilter {
	recordState: RecordState | null;
}

const index = () => {
	const [searchFilter, setSearchFilter] = useState<PaginationRequest<CategoriaFilter>>({
		page: 1,
		perPage: 10,
		filter: {
			nombre: '',
			descripcion: '',
			estado: null,
		},
	});

	const formik = useFormik<CategoriaFilterFormik>({
		initialValues: {
			nombre: '',
			descripcion: '',
			estado: null,
			recordState: null,
		},
		onSubmit: values => {
			setSearchFilter(prev => {
				return {
					...prev,
					page: 1,
					filter: {
						nombre: values.nombre,
						descripcion: values.descripcion,
						estado: values.recordState?.value,
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

	// Hooks
	const { data: docData, isFetching: isFetchingCategoria } =
		useCategoriaPaginatedSearch(searchFilter);

	const { mutateAsync: mutateAsyncDelete } = useCategoriaDeleteById();
	//________

	// Methods
	const removeCategoria = async (
		evt: MouseEvent<HTMLInputElement>,
		payload: CategoriaResponse,
	): Promise<void> => {
		evt.preventDefault();

		const question = `¿Confirmar ${
			payload.estado === true ? ESTADO_DESHABILITAR : ESTADO_HABILITAR
		} ${payload.nombre}?`;

		showAlertCondition(question, async () => {
			await mutateAsyncDelete(payload.id);
		});
	};

	const modalRef = createRef<ModalSaveCategoriaRef>();
	const modalPhotoRef = createRef<ModalPhotoSaveRef>();
	//definir-columnas
	const columnHelper = createColumnHelper<CategoriaResponse>();

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
			header: 'Estado',
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
							className="btn btn-secondary mx-2"
							onClick={() => modalRef.current?.openModal(row.original.id)}
						>
							<i className="fa-solid fa-pen-to-square"></i>
						</button>
						<button
							type="button"
							className="btn btn-info  mx-2"
							onClick={() => modalPhotoRef.current?.openModal(row.original.id)}
						>
							<i className="fa-solid fa-image"></i>
						</button>
						<Form.Check
							type="switch"
							label=""
							defaultChecked={row.original.estado}
							onClick={evt => {
								void removeCategoria(evt, row.original);
							}}
						/>
					</span>
				);
			},
		}),
	];

	return (
		<>
			<div className="row">
				<div className="col">
					<div className="accordion" id="accordionExample">
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingOne">
								<button
									className="accordion-button bg-white"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#collapseOne"
									aria-expanded="true"
									aria-controls="collapseOne"
								>
									Filtro de busqueda
								</button>
							</h2>
							<div
								id="collapseOne"
								className="accordion-collapse collapse show m-3"
								aria-labelledby="headingOne"
								data-bs-parent="#accordionExample"
							>
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
								<div className="row g-3">
									<div className="col-sm-12 col-md-3 col-lg-3">
										<div className="mb-3">
											<label className="form-label">Nombre</label>
											<input
												type="text"
												className="form-control"
												id="formGroupExampleInput"
												placeholder="Ingrese Nombre"
												name="nombre"
												value={formik.values?.nombre ?? ''}
												onChange={formik.handleChange}
												onKeyUp={e => {
													if (e.key === 'Enter') formik.handleSubmit();
												}}
											/>
										</div>
									</div>
									<div className="col-sm-12 col-md-3 col-lg-3">
										<div className="mb-3">
											<label htmlFor="formGroupExampleInput" className="form-label">
												Descripcion
											</label>
											<input
												type="text"
												className="form-control"
												id="formGroupExampleInput"
												placeholder="Ingrese Descripcion"
												name="descripcion"
												value={formik.values?.descripcion ?? ''}
												onChange={formik.handleChange}
												onKeyUp={e => {
													if (e.key === 'Enter') formik.handleSubmit();
												}}
											/>
										</div>
									</div>
									<Col xs={12} sm={6} md={4} xxl={3}>
										<Form.Label>Estado</Form.Label>
										<Select
											className="react__select react__select__sm"
											name="recordState"
											value={formik.values?.recordState}
											options={RECORD_STATUS}
											onChange={(option, target) => {
												void formik.setFieldValue(target?.name ?? '', option);
												formik.handleSubmit();
											}}
											placeholder="Buscar"
											menuPlacement="auto"
											isSearchable={false}
											isClearable
										/>
									</Col>
								</div>
							</div>
						</div>
					</div>

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
							{isFetchingCategoria ? (
								<LoadingTable />
							) : (
								<TableCoreSelectPaginated<CategoriaResponse>
									columns={columns}
									data={docData}
									goToPage={goToPage}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
			<ModalPhotoSave ref={modalPhotoRef} />
			<ModalSaveCategoria ref={modalRef} />
		</>
	);
};

export default index;
