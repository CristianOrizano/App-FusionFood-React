import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../../core/imagenes/logoDash.png';
import fire from '../../../core/imagenes/flame.png';
const Siderbar = () => {
	const location = useLocation();
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

						<li className={`sidebar-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
							<Link className="sidebar-link" to="">
								<i className="fa-solid fa-house"></i>
								<span className="align-middle">Home</span>
							</Link>
						</li>
						<li className="sidebar-header">Mantenimiento</li>

						<li
							className={`sidebar-item ${location.pathname === '/dashboard/categoria' ? 'active' : ''}`}
						>
							<Link className="sidebar-link" to="categoria">
								<i className="fa-light fa-tags"></i>
								<span className="align-middle">Categoria</span>
							</Link>
						</li>

						<li
							className={`sidebar-item ${location.pathname === '/dashboard/foodmenu' ? 'active' : ''}`}
						>
							<Link className="sidebar-link" to="foodmenu">
								<i className="fa-light fa-utensils"></i>
								<span className="align-middle">Food</span>
							</Link>
						</li>

						<li className="sidebar-item">
							<a className="sidebar-link" href="#">
								<i className="fa-light fa-user"></i>
								<span className="align-middle">Usuarios</span>
							</a>
						</li>

						<li className="sidebar-item">
							<a className="sidebar-link" href="#">
								<i className="fa-light fa-people-group"></i>
								<span className="align-middle">Clientes</span>
							</a>
						</li>

						<li className="sidebar-header">Pedidos</li>

						<li className="sidebar-item">
							<a className="sidebar-link" href="#">
								<i className="fa-light fa-burger"></i>
								<span className="align-middle">Ordenes</span>
							</a>
						</li>

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
