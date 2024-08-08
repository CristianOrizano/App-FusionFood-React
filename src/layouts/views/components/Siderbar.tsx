import { NavLink } from 'react-router-dom';
import logo from '../../../core/imagenes/logoDash.png';
import fire from '../../../core/imagenes/flame.png';

const Siderbar = () => {
	return (
		<>
			<nav id="sidebar" className="sidebar js-sidebar">
				<div className="sidebar-content js-simplebar">
					<a className="sidebar-brand text-center" href="#">
						<span className="align-middle">
							<img src={logo} width="145" />
							<img src={fire} width="30" />
						</span>
					</a>

					<ul className="sidebar-nav">
						<li className="sidebar-header">Dashboard</li>

						<NavLink
							className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
							to="/dashboard"
							end
						>
							<span className="sidebar-link">
								<i className="fa-solid fa-house"></i>
								<span className="align-middle">Home</span>
							</span>
						</NavLink>

						<li className="sidebar-header">Mantenimiento</li>

						<NavLink
							className={({ isActive }) => `nav-link sidebar-item ${isActive ? 'active' : ''}`}
							to="/dashboard/categoria"
						>
							<span className="sidebar-link">
								<i className="bi bi-tags"></i>
								<span className="align-middle">Categoria</span>
							</span>
						</NavLink>

						<NavLink
							className={({ isActive }) => `nav-link sidebar-item ${isActive ? 'active' : ''}`}
							to="/dashboard/foodmenu"
						>
							<span className="sidebar-link">
								<i className="bi bi-egg-fried"></i>
								<span className="align-middle">Food</span>
							</span>
						</NavLink>

						<NavLink
							className={({ isActive }) => `nav-link sidebar-item ${isActive ? 'active' : ''}`}
							to="/dashboard/usuario"
						>
							<span className="sidebar-link">
								<i className="bi bi-person"></i>
								<span className="align-middle">Usuario</span>
							</span>
						</NavLink>

						<NavLink
							className={({ isActive }) => `nav-link sidebar-item ${isActive ? 'active' : ''}`}
							to="/dashboard/cliente"
						>
							<span className="sidebar-link">
								<i className="bi bi-people"></i>
								<span className="align-middle">Cliente</span>
							</span>
						</NavLink>

						<li className="sidebar-header">Pedidos</li>

						<NavLink
							className={({ isActive }) => `nav-link sidebar-item ${isActive ? 'active' : ''}`}
							to="/dashboard/ordenes"
						>
							<span className="sidebar-link">
								<i className="bi bi-backpack4"></i>
								<span className="align-middle">Ordenes</span>
							</span>
						</NavLink>

						<li className="sidebar-item">
							<a className="sidebar-link" href="#">
								<i className="fa-solid fa-file-pdf"></i>
								<span className="align-middle">Reportes</span>
							</a>
						</li>
						<li className="sidebar-header">FeadBacks</li>

						<li className="sidebar-item">
							<a className="sidebar-link" href="#">
								<i className="fa-solid fa-address-book"></i>
								<span className="align-middle">Contactos</span>
							</a>
						</li>

						<li className="sidebar-header">Reportes</li>

						<li className="sidebar-item">
							<a className="sidebar-link" href="#">
								<i className="fa-solid fa-money-check-dollar"></i>
								<span className="align-middle">Ventas</span>
							</a>
						</li>

						<li className="sidebar-item">
							<a className="sidebar-link" href="#">
								<i className="align-middle" data-feather="check-square"></i>{' '}
								<span className="align-middle">Pedido</span>
							</a>
						</li>
						<li className="sidebar-item">
							<a className="sidebar-link" href="#">
								<i className="align-middle" data-feather="check-square"></i>{' '}
								<span className="align-middle">clientes</span>
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Siderbar;
