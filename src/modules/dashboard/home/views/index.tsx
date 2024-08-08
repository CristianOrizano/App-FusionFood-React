import useClientePaginatedSearch from '@/modules/pages/login/application/useClientePaginatedSearch';
import { useCategoriaFindAll } from '../../categorias/application';
import { useFoodFindAll } from '../../food/application';
import '../styles/home.css';
import { PaginationRequest } from '@/modules/shared/domain';
import { ClienteFilter } from '@/modules/pages/login/domain';
import { useState } from 'react';
import useOrdenPaginatedSearch from '../../orden/application/useOrdenPaginatedSearch';
import { OrdenFilter } from '../../orden/domain/OrdenFilter';
import { UsuarioFilter } from '../../usuario/domain';
import { useUsuarioPaginated } from '../../usuario/application';
import { Link } from 'react-router-dom';
import '@/layouts/views/templates/js/app.js';

const index = () => {
	const { data: dataCategoria } = useCategoriaFindAll();
	const { data: dataFood } = useFoodFindAll();
	const [searchFilter, setSearchFilter] = useState<PaginationRequest<ClienteFilter>>({
		page: 1,
		perPage: 10,
		filter: {
			apellidos: '',
			nombres: '',
			correo: '',
		},
	});

	const { data: dataCliente } = useClientePaginatedSearch(searchFilter);

	const [searchFilte] = useState<PaginationRequest<OrdenFilter>>({
		page: 1,
		perPage: 10,
		filter: {
			tipoPago: '',
			estado: 0,
		},
	});

	const { data: dataOrden } = useOrdenPaginatedSearch(searchFilte);

	const [searchFilterUsuario] = useState<PaginationRequest<UsuarioFilter>>({
		page: 1,
		perPage: 10,
		filter: {
			apellido: '',
			nombre: '',
			email: '',
		},
	});

	const { data: dataUsuario } = useUsuarioPaginated(searchFilterUsuario);
	return (
		<>
			<div>
				<div className="container-fluid p-0">
					<h1 className="h3 mb-3">
						<strong>Dashboard</strong> Home
					</h1>
					<h4 className="my-4">
						¡Bienvenido ! Este es el panel principal del sistema acá podrá encontrar atajos para
						acceder a los distintos listados de cada módulo del sistema.
					</h4>

					<div className="row">
						<div className="col-sm-3">
							<div className="card gradient-background">
								<div className="card-body">
									<div className="row">
										<div className="col mt-0">
											<h4 className="fw-bold" style={{ color: '#FFA07A' }}>
												Categorias
											</h4>
										</div>

										<div className="col-auto">
											<div className="bg-danger px-3 fs-1 shadow-lg rounded">
												<i className="fa-solid fa-tags text-white"></i>
											</div>
										</div>
									</div>
									<h1 className="text-white" style={{ color: '#FFA07A' }}>
										{dataCategoria?.length ?? 0}
									</h1>

									<Link to="categoria" className="text-white">
										ver detalles
									</Link>
								</div>
							</div>
						</div>
						<div className="col-sm-3">
							<div className="card gradient-background">
								<div className="card-body">
									<div className="row">
										<div className="col mt-0">
											<h4 className="fw-bold" style={{ color: '#FFA07A' }}>
												Menus
											</h4>
										</div>

										<div className="col-auto">
											<div className="bg-info px-3 fs-1 shadow-lg  rounded">
												<i className="fa-solid fa-pizza-slice text-white"></i>
											</div>
										</div>
									</div>
									<h1 className="text-white" style={{ color: '#FFA07A' }}>
										{dataFood?.length ?? 0}
									</h1>

									<Link to="foodmenu" className="text-white">
										ver detalles
									</Link>
								</div>
							</div>
						</div>
						<div className="col-sm-3">
							<div className="card gradient-background">
								<div className="card-body">
									<div className="row">
										<div className="col mt-0">
											<h4 className="fw-bold" style={{ color: '#FFA07A' }}>
												Ordenes
											</h4>
										</div>

										<div className="col-auto">
											<div className="bg-warning px-3 fs-1 shadow-lg  rounded">
												<i className="fa-solid fa-cubes-stacked text-white"></i>
											</div>
										</div>
									</div>
									<h1 className="text-white" style={{ color: '#FFA07A' }}>
										{dataOrden.total ?? 0}
									</h1>

									<Link to="ordenes" className="text-white">
										ver detalles
									</Link>
								</div>
							</div>
						</div>
						<div className="col-sm-3">
							<div className="card gradient-background">
								<div className="card-body">
									<div className="row">
										<div className="col mt-0">
											<h4 className="fw-bold" style={{ color: '#FFA07A' }}>
												Clientes
											</h4>
										</div>

										<div className="col-auto">
											<div className="bg-primary px-3 fs-1 shadow-lg rounded">
												<i className="fa-solid fa-users text-white"></i>
											</div>
										</div>
									</div>
									<h1 className="text-white" style={{ color: '#FFA07A' }}>
										{dataCliente?.total ?? 0}
									</h1>

									<Link to="cliente" className="text-white">
										ver detalles
									</Link>
								</div>
							</div>
						</div>
						<div className="col-sm-3">
							<div className="card gradient-background">
								<div className="card-body">
									<div className="row">
										<div className="col mt-0">
											<h4 className="fw-bold" style={{ color: '#FFA07A' }}>
												Usuarios
											</h4>
										</div>

										<div className="col-auto">
											<div className="bg-success px-3 fs-1 shadow-lg  rounded">
												<i className="fa-solid fa-user-tie text-white"></i>
											</div>
										</div>
									</div>
									<h1 className="text-white" style={{ color: '#FFA07A' }}>
										{dataUsuario?.total ?? 0}
									</h1>

									<Link to="usuario" className="text-white text-decoration-none">
										ver detalles
									</Link>
								</div>
							</div>
						</div>
						<div className="col-sm-3">
							<div className="card gradient-background">
								<div className="card-body">
									<div className="row">
										<div className="col mt-0">
											<h4 className="fw-bold" style={{ color: '#FFA07A' }}>
												Contactos
											</h4>
										</div>

										<div className="col-auto">
											<div
												className="px-3 fs-1 shadow-lg rounded"
												style={{ background: '#835DB7' }}
											>
												<i className="fa-solid fa-envelope text-white"></i>
											</div>
										</div>
									</div>
									<h1 className="text-white" style={{ color: '#FFA07A' }}>
										20
									</h1>

									<span className="text-white">ver detalles</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default index;
