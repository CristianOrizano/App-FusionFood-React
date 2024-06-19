import { Button, Form, InputGroup, Offcanvas } from 'react-bootstrap';
import logo from '../../../core/imagenes/logoDash.png';
import fire from '../../../core/imagenes/flame.png';
import perfil from '../../../core/imagenes/profile.png';
import { useNavigate } from 'react-router';
import { createRef, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../pages/pago/styles/pago.css';
import { useCart } from '@/modules/dashboard/food/application/useCar';
import ModalLogin, { ModalLoginRef } from './components/ModalLogin';
import { LocalStorageSessionCliente } from '@/core/sessions';
import { getPhoto } from '@/core/firebase/config';
import shoping from '@/core/imagenes/shopping-cart.png';
import Swal from 'sweetalert2';

const NavbarPage = (): JSX.Element => {
	const [query, setQuery] = useState('');
	const navigate = useNavigate();

	//const { cartItems: data, removeFromCart } = useCart2();
	const { carritoLista: data, removeFromCart, aumentar, disminuir, contar, total } = useCart();
	const isValidAuth = LocalStorageSessionCliente.existsAuthorization();
	const ClienteAuth = LocalStorageSessionCliente.getAuthorization();
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const cerrarSesion = (e: { preventDefault: () => void }): void => {
		e.preventDefault();
		LocalStorageSessionCliente.removeAuthorization();
		navigate(`/`);
	};
	const modalRef = createRef<ModalLoginRef>();

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
	const handleButtonClick = () => {
		if (isValidAuth) {
			navigate(`/checkout`);
		} else {
			Swal.fire({
				icon: 'warning',
				title: 'Oops...',
				text: 'Necesita iniciar sesion para ver el carrito compras',
			});
		}
	};

	const handleIncrement = (id: number, cantidad: number) => {
		if (cantidad < 5) {
			aumentar(id);
		}
	};
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleDecrement = (id: number) => {
		disminuir(id);
	};
	useEffect(() => {
		if (ClienteAuth?.nimagen != null) {
			getPhoto(ClienteAuth.nimagen, 'cliente')
				.then(url => {
					setSelectedImage(url); // Actualiza el estado con la URL de la imagen
				})
				.catch(error => {
					console.error('Error al obtener la URL de la imagen:', error);
					// Maneja el error si ocurre
				});
		}
	}, [ClienteAuth]);

	return (
		<>
			<Offcanvas show={show} onHide={handleClose} placement="end">
				<Offcanvas.Header closeButton className="headerpago">
					<Offcanvas.Title className="text-white ">Mi carrito</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ul className="list-group list-group-flush overflow-auto " style={{ maxHeight: '600px' }}>
						{data && data.length > 0 ? (
							data?.map((item, key) => (
								<li className="list-group-item  border-top bg-secondary" key={key}>
									<div className="row align-items-center  ">
										<div className="col-3 bg-white px-0">
											<img src={item.imgFire} className="img-fluid" alt={`Image ${key}`} />
										</div>
										<div className="col-7 ">
											<p className=" lh-1">
												<small> {item.nombre}</small>
											</p>
											<div>
												<small className="fw-bold ">
													{item.precio.toLocaleString('es-PE', {
														style: 'currency',
														currency: 'PEN',
													})}
												</small>
												<div
													className="btn-group mx-2"
													role="group"
													aria-label="Basic outlined example"
												>
													<button
														type="button"
														className="btn btn-outline-dark py-0 px-2"
														onClick={() => handleDecrement(item.id)}
													>
														<small> -</small>
													</button>
													<button type="button" className="btn btn-outline-dark py-0 px-2">
														<small>{item.cantidad}</small>
													</button>
													<button
														type="button"
														className="btn btn-outline-dark py-0 px-2"
														onClick={() => handleIncrement(item.id, item.cantidad)}
													>
														<small> +</small>
													</button>
												</div>
											</div>
										</div>
										<div className="col-2 ">
											<div className="mt-2 ">
												<a onClick={() => removeFromCart(item.id)}>
													<strong className="me-1">
														<i className="bi bi-trash3 text-danger"></i>
													</strong>
												</a>
											</div>
										</div>
									</div>
								</li>
							))
						) : (
							<div className="text-center ">
								<img src={shoping} width="60" />
								<p> No tiene ningún pedido en su carrito de compras.</p>
							</div>
						)}
					</ul>

					<div className="position-absolute bottom-0 start-0 w-100 p-3">
						<div className="row bg-secondary shadow px-3 py-2">
							<div className="col-6 fw-bold">Subtotal:</div>
							<div className="col-6  ">{total()}</div>
						</div>

						<div className="d-grid gap-2">
							<a className="btn btn-dark " onClick={handleButtonClick}>
								Ver todo el carrito
							</a>
						</div>
					</div>
				</Offcanvas.Body>
			</Offcanvas>

			<header className="navbar d-block navbar-sticky navbar-expand-lg navbar-light bg-light  fixed-top">
				<div className="container py-0">
					<a className="" href="index.html">
						<img src={logo} width="115" />
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
						{isValidAuth ? (
							<div className="d-flex  align-items-center ">
								<p className=" m-1">{ClienteAuth.nombres} </p>

								<a href="/profile">
									<img
										className="rounded-pill border border-dark bg-dark"
										src={selectedImage || perfil}
										style={{ width: '35px', height: '35px' }}
									/>
								</a>
							</div>
						) : (
							<div className="fs-4">
								<i className="bi bi-person-circle"></i>
							</div>
						)}

						<div className="navbar-tool dropdown ms-3">
							<a className="navbar-tool-icon-box bg-secondary dropdown-toggle" onClick={handleShow}>
								<span className="navbar-tool-label bg-danger">{contar()}</span>
								<i className="bi bi-cart3 fs-5"></i>
							</a>
						</div>
						{isValidAuth ? (
							<div className="navbar-tool dropdown ms-3">
								<a className="btn btn-danger  btn-shadow p-1 text-white" onClick={cerrarSesion}>
									<i className="bi bi-power"></i> Cerrar
								</a>
							</div>
						) : (
							<div className="navbar-tool dropdown ms-3">
								<a
									className="btn btn-dark btn-shadow p-1"
									onClick={() => modalRef.current?.openModal()}
								>
									<i className="bi bi-box-arrow-in-right"></i> Login
								</a>
							</div>
						)}
					</div>
					<div className="collapse navbar-collapse me-auto order-lg-2" id="navbarCollapse">
						<ul className="navbar-nav ms-lg-4 pe-lg-2 me-lg-2">
							<li className="nav-item">
								<NavLink
									className={({ isActive }) => `nav-link fw-bold p-2 ${isActive ? 'active' : ''}`}
									to="/"
								>
									Inicio
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									className={({ isActive }) => `nav-link fw-bold p-2 ${isActive ? 'active' : ''}`}
									to="/menu"
								>
									Menu
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									className={({ isActive }) => `nav-link fw-bold p-2 ${isActive ? 'active' : ''}`}
									to="/about"
								>
									Nosotros
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									className={({ isActive }) => `nav-link fw-bold p-2 ${isActive ? 'active' : ''}`}
									to="/contact"
								>
									Contacto
								</NavLink>
							</li>
						</ul>
						<form className="d-flex pt-3 mx-4 align-items-end justify-content-center">
							<InputGroup className="mb-3" size="sm">
								<Form.Control
									placeholder="Buscar pedido"
									aria-describedby="basic-addon1"
									value={query}
									onChange={e => handleChange(e)}
								/>
								<InputGroup.Text id="basic-addon1" onClick={() => search()}>
									<i className="fa-solid fa-magnifying-glass"></i>
								</InputGroup.Text>
							</InputGroup>
						</form>
					</div>
				</div>
			</header>
			<ModalLogin ref={modalRef} />
		</>
	);
};

export default NavbarPage;
