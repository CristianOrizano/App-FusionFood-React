import { Link } from 'react-router-dom';

const Siderbar = () => {
	return (
		<>
			<nav id="sidebar" className="sidebar js-sidebar">
				<div className="sidebar-content js-simplebar">
					<a className="sidebar-brand" href="#">
						<span className="align-middle">Admin Food</span>
					</a>

					<ul className="sidebar-nav">
						<li className="sidebar-header">Mantenimiento</li>

						<li className="sidebar-item">
							<Link className="sidebar-link" to="categoria">
								<i className="align-middle" data-feather="sliders"></i>{' '}
								<span className="align-middle">Categoria</span>
							</Link>
						</li>

						<li className="sidebar-item">
							<Link className="sidebar-link" to="foodmenu">
								<i className="align-middle" data-feather="user"></i>{' '}
								<span className="align-middle">Food</span>
							</Link>
						</li>

						<li className="sidebar-item">
							<a className="sidebar-link" href="#">
								<i className="align-middle" data-feather="log-in"></i>{' '}
								<span className="align-middle">Sign In</span>
							</a>
						</li>

						<li className="sidebar-item">
							<a className="sidebar-link" href="#">
								<i className="align-middle" data-feather="user-plus"></i>{' '}
								<span className="align-middle">Sign Up</span>
							</a>
						</li>

						<li className="sidebar-item active">
							<a className="sidebar-link" href="#">
								<i className="align-middle" data-feather="book"></i>{' '}
								<span className="align-middle">Blank</span>
							</a>
						</li>

						<li className="sidebar-header">Tools & Components</li>

						<li className="sidebar-item">
							<a className="sidebar-link" href="#">
								<i className="align-middle" data-feather="square"></i>{' '}
								<span className="align-middle">Buttons</span>
							</a>
						</li>

						<li className="sidebar-item">
							<a className="sidebar-link" href="#">
								<i className="align-middle" data-feather="check-square"></i>{' '}
								<span className="align-middle">Forms</span>
							</a>
						</li>

						<li className="sidebar-item">
							<a className="sidebar-link" href="#">
								<i className="align-middle" data-feather="grid"></i>{' '}
								<span className="align-middle">Cards</span>
							</a>
						</li>

						<li className="sidebar-item">
							<a className="sidebar-link" href="#">
								<i className="align-middle" data-feather="align-left"></i>{' '}
								<span className="align-middle">Typography</span>
							</a>
						</li>

						<li className="sidebar-item">
							<a className="sidebar-link" href="#">
								<i className="align-middle" data-feather="coffee"></i>{' '}
								<span className="align-middle">Icons</span>
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Siderbar;
