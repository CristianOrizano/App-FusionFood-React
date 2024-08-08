import NavbarPage from '@/modules/shared/navbar/NavbarPage';

import '../../../../layouts/views/static/css/theme.min2.css';
import bannercategoria from '../../../../core/imagenes/fondocategoria.jpg';
import categoria from '../../../../core/imagenes/category/01.jpg';
import nodisponible from '../../../../core/imagenes/nodisponible.png';
import noserach from '../../../../core/imagenes/nosearch.png';
import {
	useCategoriaFindAll,
	useCategoriaFindById,
} from '@/modules/dashboard/categorias/application';
import { useFoodPaginatedSearch } from '@/modules/dashboard/food/application';
import { createRef, useEffect, useState } from 'react';
import { FilterPage, PaginationRequest } from '@/modules/shared/domain';
import { FoodCar, FoodFilter, FoodResponse } from '@/modules/dashboard/food/domain';

import PaginationLinksProducts from '@/core/components/table/PaginationLinksProducts';
import { FormSelect } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import LoadingCategoria from '@/core/components/loading/LoadingCategoria';
import LoadingFood from '@/core/components/loading/LoadingFood';
import FooterPage from '@/modules/shared/navbar/FooterPage';
import ModalFood, { ModalFoodRef } from '../components/ModalFood';
import { useCart } from '@/modules/dashboard/food/application/useCar';

import { toastSuccess } from '@/core/helpers/ToastHelper';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const index = () => {
	const navigate = useNavigate();
	//recuperar parametro por ruta
	const { query } = useParams();
	const { category } = useParams();
	console.log('query>>', query);
	//hooks
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
	const [sortOrder, setSortOrder] = useState(''); // Estado para controlar el valor del select
	const [id, setId] = useState<number>(0);
	const [categoriaNombre, setCategoriaNombre] = useState<string>('Todos');
	const [columns, setColumns] = useState(5);
	const { data: dataCategorias, isFetching: isFetchingCategoria } = useCategoriaFindAll();
	const { data: docData, isFetching: isFetchingFood } = useFoodPaginatedSearch(searchFilter);
	const { data: dataCategoria } = useCategoriaFindById(id);
	const [loading, setLoading] = useState(false);
	const [pageSize, setPageSize] = useState<number>(10);
	const perPageItems: number[] = [20, 30, 40, 50, 100];
	const { addToCart } = useCart();
	const modalRef = createRef<ModalFoodRef>();

	const goToPage = (payload: FilterPage): void => {
		setSearchFilter({
			...searchFilter,
			page: payload.page,
			perPage: payload.perPage,
		});
	};
	const categoriaFilter = (cod: number): void => {
		setSortOrder('');
		setSearchFilter({
			...searchFilter,
			page: 1,
			filter: {
				idCategoria: cod,
				descripcion: '',
				nombre: '',
			},
		});
		navigate(`/menu/${cod}`);
	};

	const AvanzadoFilter = (tipo: string, order: string): void => {
		setSearchFilter(prevFilter => ({
			...prevFilter,
			filter: {
				...prevFilter.filter,
				sortOrderNombre: tipo === 'nombre' ? order : undefined,
				sortOrderPrecio: tipo === 'precio' ? order : undefined,
			},
		}));
	};

	const agregarCarro = (food: FoodResponse) => {
		const foodcar: FoodCar = {
			id: food.id,
			descripcion: food.descripcion,
			nombre: food.nombre,
			cantidad: 1,
			nombreImg: food.nombreImg,
			imgFire: food.imgFire,
			precio: food.precio,
		};

		toastSuccess('Agregado al carrito');
		addToCart(foodcar);
	};

	const handleSelectChange = (event: any): void => {
		const value = event.target.value;
		setSortOrder(event.target.value);
		switch (value) {
			case 'precio-asc':
				AvanzadoFilter('precio', 'asc');
				break;
			case 'precio-desc':
				AvanzadoFilter('precio', 'desc');
				break;
			case 'nombre-asc':
				AvanzadoFilter('nombre', 'asc');
				break;
			case 'nombre-desc':
				AvanzadoFilter('nombre', 'desc');
				break;
			default:
				AvanzadoFilter('nombre', '');
				break;
		}
	};

	const handleColumnsChange = (num: number) => {
		setLoading(true);
		setTimeout(() => {
			setColumns(num);
			setLoading(false); // Oculta el componente de carga después de un delay
		}, 1500); // Ajusta el tiempo según la animación deseada
	};
	useEffect(() => {
		if (query !== undefined) {
			setId(0);
			setSearchFilter({
				...searchFilter,
				filter: {
					idCategoria: 0,
					descripcion: '',
					nombre: query as string,
				},
			});
			/*
			setSearchFilter(prevFilter => ({
				...prevFilter,
				filter: {
					idCategoria: 0,
					descripcion: '',
					nombre: query as string,
				},
			}));
		*/
		}
		if (category !== undefined) {
			setId(Number(category));

			setSearchFilter({
				...searchFilter,
				filter: {
					idCategoria: Number(category),
					descripcion: '',
					nombre: '',
				},
			});
		}
	}, [query, category]);

	useEffect(() => {
		setCategoriaNombre('Todas');
		if (dataCategoria != null) {
			setCategoriaNombre(dataCategoria.nombre);
		}
	}, [dataCategoria]);

	return (
		<>
			<main className="page-wrapper">
				<NavbarPage />
				<section
					className="bg-darker bg-size-cover bg-position-center py-5"
					style={{ backgroundImage: `url(${bannercategoria})` }}
				>
					<div className="container py-md-4">
						<h1 className="text-light text-center text-lg-start pt-5">
							Explora nuestras categorías
						</h1>
						<p className="text-white">Descubre las opciones que tenemos para ti.</p>
					</div>
				</section>

				<section className="bg-secondary  ">
					<div className="container overflow-scroll  d-flex ">
						<a className="mx-5 my-3" onClick={() => categoriaFilter(0)}>
							<img
								className="mb-2 rounded-circle "
								src={categoria}
								style={{
									height: '60px',
									width: '60px',
									border: dataCategoria === undefined ? '4px solid #64DECE' : 'none',
								}}
								alt="Noodles"
							/>
							<p
								className={`text-nowrap text-dark ${dataCategoria === undefined ? 'fw-bold' : ''}`}
							>
								Todas
							</p>
						</a>
						{isFetchingCategoria ? (
							<LoadingCategoria />
						) : (
							dataCategorias?.map((item, key) => (
								<a
									key={key}
									className="btn btn-link p-0 mx-5 my-3 text-center"
									onClick={() => categoriaFilter(item.id)}
								>
									<img
										className="mb-2 rounded-circle"
										src={item.imgFire}
										style={{
											height: '60px',
											width: '60px',
											border: dataCategoria?.id === item.id ? '4px solid #64DECE' : 'none',
										}}
									/>
									<p
										className={`text-nowrap text-dark ${dataCategoria?.id === item.id ? 'fw-bold' : ''}`}
									>
										{item.nombre}
									</p>
								</a>
							))
						)}
					</div>
				</section>

				<section className="container tab-content  py-4">
					<div className="d-md-flex justify-content-between align-items-center">
						<h4 className="text-center ">{categoriaNombre}</h4>

						<div className="d-flex justify-content-between align-items-center">
							<a
								className={`me-3 btn btn-link p-0 ${columns === 5 ? 'text-danger ' : 'text-dark'}`}
								onClick={() => handleColumnsChange(5)}
							>
								<i className="bi bi-grid-3x3-gap-fill fs-5"></i>
							</a>
							<a
								className={`me-3 btn btn-link p-0 ${columns === 4 ? 'text-danger ' : 'text-dark'}`}
								onClick={() => handleColumnsChange(4)}
							>
								<i className="bi bi-grid-fill fs-5"></i>
							</a>

							<FormSelect
								className="w-auto mx-3"
								value={pageSize}
								onChange={e => {
									const perPage = Number(e.target.value);
									setPageSize(perPage);
									goToPage({ page: 1, perPage });
								}}
							>
								<option value={10}>Mostrar: 10</option>
								{perPageItems.map(pageSizeItem => (
									<option key={pageSizeItem} value={pageSizeItem}>
										{pageSizeItem}
									</option>
								))}
							</FormSelect>

							<div>
								<select
									className="form-select"
									value={sortOrder}
									aria-label="Default select example"
									onChange={e => handleSelectChange(e)}
								>
									<option value="">Ordenar por: Destacados</option>
									<option value="precio-asc">Precio: de barato a caro</option>
									<option value="precio-desc">Precio: de caro a barato</option>
									<option value="nombre-asc">Forma Ascendente: A-Z</option>
									<option value="nombre-desc">Forma Descendente: Z-A</option>
								</select>
							</div>
						</div>
					</div>

					<div className="mb-5">
						{loading || isFetchingFood ? (
							<LoadingFood />
						) : (
							<>
								{docData.data.length === 0 ? (
									<div className="mt-5">
										<p className="text-center fs-6">
											No hay resultados disponibles.
											<img className="mx-2" style={{ width: '40px' }} src={noserach} />
										</p>
									</div>
								) : (
									<>
										<div className={`mt-5 row row-cols-sm-2 row-cols-lg-${columns}`}>
											{docData.data.map((item, key) => (
												<div key={key} className="col mb-grid-gutter ">
													<div className="card border pb-2 h-100">
														<a
															className=""
															style={{ cursor: 'pointer' }}
															onClick={() => modalRef.current?.openModal(item.id)}
														>
															<LazyLoadImage
																src={item.imgFire || nodisponible}
																className="card-img-top "
																placeholderSrc={nodisponible}
																alt="Pizza"
																width="100%"
																effect="blur"
																style={{ objectFit: 'cover', height: '200px' }}
																// Aplica el efecto de desenfoque mientras se carga
															/>
														</a>

														<div className="card-body d-flex flex-column justify-content-between pt-3 ">
															<h3 className="product-title fs-md">
																<a href="#quick-view" data-bs-toggle="modal">
																	{item.nombre}
																</a>
															</h3>
															<p className="fs-ms text-muted">{item.descripcion}</p>

															<div className="d-flex align-items-center justify-content-between mt-1">
																<div className="product-price">
																	<span className="text-accent ">
																		{item.precio.toLocaleString('es-PE', {
																			style: 'currency',
																			currency: 'PEN',
																		})}
																	</span>
																</div>
																<button
																	className="btn btn-danger btn-sm  py-0"
																	type="button"
																	onClick={() => agregarCarro(item)}
																>
																	+<i className="bi bi-cart3 fs-5 "></i>
																</button>
															</div>
														</div>
													</div>
												</div>
											))}
										</div>
										<div>
											<PaginationLinksProducts data={docData} goToPage={goToPage} />
										</div>
									</>
								)}
							</>
						)}
					</div>

					<ModalFood ref={modalRef} />
				</section>
				<FooterPage />
			</main>
		</>
	);
};

export default index;
