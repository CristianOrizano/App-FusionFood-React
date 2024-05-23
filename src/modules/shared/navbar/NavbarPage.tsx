import { Form, InputGroup } from 'react-bootstrap';
import logo from '../../../core/imagenes/logoDash.png';
import fire from '../../../core/imagenes/flame.png';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
type Props = {
	some?: string;
};
const NavbarPage = (): JSX.Element => {
	const [query, setQuery] = useState('');
	const navigate = useNavigate();

	const handleChange = (e: any) => {
		setQuery(e.target.value);
	};

	const search = () => {
		console.log('search >>>', query);
		if (query != '') {
			navigate(`/menu/${query}`);
		} else {
			navigate(`/menu/${' '}`);
		}
		setQuery('');
	};

	return (
		<>
			<header className="navbar d-block navbar-sticky navbar-expand-lg navbar-light bg-light  fixed-top">
				<div className="container py-0">
					<a className="" href="index.html">
						<img src={logo} width="142" />
						<img src={fire} width="30" />
					</a>

					<div className="navbar-toolbar d-flex align-items-center order-lg-3">
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarCollapse"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="fs-4">
							<i className="fa-light fa-user"></i>
						</div>
						<div className="mx-3 fs-5">
							<div className="navbar-tool dropdown ms-3">
								<a className="navbar-tool-icon-box bg-secondary dropdown-toggle">
									<span className="navbar-tool-label bg-danger">3</span>
									<i className="fa-light fa-cart-shopping"></i>
								</a>
							</div>
						</div>

						<a className="btn btn-dark btn-shadow p-2" target="_blank" rel="noopener">
							<i className="fa-light fa-right-to-bracket"></i> Login
						</a>
					</div>
					<div className="collapse navbar-collapse me-auto order-lg-2 " id="navbarCollapse">
						<ul className="navbar-nav ms-lg-4 pe-lg-2 me-lg-2">
							<NavLink className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} to="/">
								<a className="fw-bold nav-link p-2">Inicio</a>
							</NavLink>
							<NavLink
								className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
								to="/menu"
							>
								<a className="fw-bold nav-link p-2">Menu</a>
							</NavLink>
							<NavLink
								className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
								to="/about"
							>
								<a className="fw-bold nav-link p-2">Nosotros</a>
							</NavLink>
							<NavLink
								className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
								to="/contact"
							>
								<a className="fw-bold nav-link p-2">Contacto</a>
							</NavLink>
						</ul>
						<form className="d-flex pt-3 mx-4 align-items-end justify-content-center">
							<InputGroup className="mb-3" size="sm">
								<Form.Control
									placeholder="Buscar pedido"
									aria-describedby="basic-addon1"
									value={query}
									onChange={e => handleChange(e)}
								/>
								<a>
									<InputGroup.Text id="basic-addon1" onClick={() => search()}>
										<i className="fa-solid fa-magnifying-glass"></i>
									</InputGroup.Text>
								</a>
							</InputGroup>
						</form>
					</div>
				</div>
			</header>
		</>
	);
};

export default NavbarPage;
