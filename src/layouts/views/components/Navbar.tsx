import avatar5 from '@/layouts/views/templates/img/avatars/avatar-4.jpg';
import avatar4 from '@/layouts/views/templates/img/avatars/avatar-3.jpg';
import avatar3 from '@/layouts/views/templates/img/avatars/avatar-2.jpg';
import avatar2 from '@/layouts/views/templates/img/avatars/avatar-5.jpg';
import avatar from '@/layouts/views/templates/img/avatars/avatar.jpg';
import { LocalStorageSession } from '@/core/sessions';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const navigate = useNavigate();

	const cerrarSesion = (e: { preventDefault: () => void }): void => {
		e.preventDefault();
		LocalStorageSession.removeAuthorization();

		navigate('/login');
	};

	return (
		<>
			<nav className="navbar navbar-expand navbar-light navbar-bg">
				<a className="sidebar-toggle js-sidebar-toggle">
					<i className="hamburger align-self-center"></i>
				</a>

				<div className="navbar-collapse collapse">
					<ul className="navbar-nav navbar-align">
						<li className="nav-item dropdown">
							<a
								className="nav-icon dropdown-toggle d-inline-block d-sm-none"
								href="#"
								data-bs-toggle="dropdown"
							>
								<i className="align-middle" data-feather="settings"></i>
							</a>

							<a
								className="nav-link dropdown-toggle d-none d-sm-inline-block"
								href="#"
								data-bs-toggle="dropdown"
							>
								<img src={avatar} className="avatar img-fluid rounded me-1" alt="Charles Hall" />{' '}
								<span className="text-dark ">Cristian Orizano</span>
							</a>
							<div className="dropdown-menu dropdown-menu-end">
								<a className="dropdown-item" href="pages-profile.html">
									<i className="align-middle me-1" data-feather="user"></i> Profile
								</a>

								<a className="dropdown-item" href="index.html">
									<i className="align-middle me-1" data-feather="settings"></i> Settings & Privacy
								</a>

								<div className="dropdown-divider"></div>
								<a className="dropdown-item" href="#" onClick={cerrarSesion}>
									Log out
								</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
