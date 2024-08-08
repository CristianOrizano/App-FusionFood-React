import banner from '../../../core/imagenes/hero-bg.jpg';
import categoria1 from '../../../core/imagenes/category/01.jpg';
import categoria2 from '../../../core/imagenes/category/02.jpg';
import chifa from '../../../core/imagenes/category/chifa2.png';
import categoria4 from '../../../core/imagenes/category/04.jpg';
import categoria5 from '../../../core/imagenes/category/05.jpg';

import delivery from '../../../core/imagenes/variedad.jpg';
import pedido from '../../../core/imagenes/phone.png';
import './styles/test.css';

const index = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark  bg-dark">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						Navbar
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="#">
									Home
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">
									Link
								</a>
							</li>
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="#"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									Dropdown
								</a>
								<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
									<li>
										<a className="dropdown-item" href="#">
											Action
										</a>
									</li>
									<li>
										<a className="dropdown-item" href="#">
											Another action
										</a>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<a className="dropdown-item" href="#">
											Something else here
										</a>
									</li>
								</ul>
							</li>
							<li className="nav-item">
								<a className="nav-link disabled" href="#" aria-disabled="true">
									Disabled
								</a>
							</li>
						</ul>
						<form className="d-flex">
							<input
								className="form-control me-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<button className="btn btn-outline-success" type="submit">
								Search
							</button>
						</form>
					</div>
				</div>
			</nav>
			<div
				className="container-fluid py-5 py-lg-10"
				style={{
					backgroundImage: `url(${banner})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					textAlign: 'center',
				}}
			>
				<div className="container my-5">
					<h1 className="display-4 text-light">¡Bienvenido!</h1>
					<p className="lead  text-light">
						Este es un banner destacado utilizando una imagen de fondo.
					</p>
					<a href="#" className="btn btn-light btn-lg">
						Learn more
					</a>
				</div>
			</div>
			<div className="container  my-1 text-center ">
				<div className=" p-5">
					<h1 className="fw-normal ">Nuestros platillos populares</h1>
					<p className="lead  fw-bold text-secondary">
						Elige lo que quieras y nosotros te lo dimos
					</p>
				</div>
				<div className="row row-cols-2 row-cols-md-3 ">
					<div className="col ">
						<div className="card text-secondary shadow-lg  mb-5  rounded">
							<img src={categoria1} className="card-img-top" alt="..." />
							<div className="card-body p-4">
								<h4 className="lead fw-bold card-title">Hamburgesas</h4>
							</div>
						</div>
					</div>
					<div className="col">
						<div className="card text-secondary shadow-lg  mb-5 bg-body rounded">
							<img src={categoria2} className="card-img-top" alt="..." />
							<div className="card-body p-4">
								<h4 className="lead fw-bold card-title">Pastas</h4>
							</div>
						</div>
					</div>
					<div className="col">
						<div className="card text-secondary shadow-lg  mb-5 bg-body rounded">
							<img src={categoria2} className="card-img-top" alt="..." />
							<div className="card-body p-4">
								<h4 className="lead fw-bold card-title">Polleria</h4>
							</div>
						</div>
					</div>
					<div className="col">
						<div className="card text-secondary shadow-lg  mb-4 bg-body rounded">
							<img src={categoria4} className="card-img-top" alt="..." />
							<div className="card-body p-4">
								<h4 className="lead fw-bold card-title">Pizas</h4>
							</div>
						</div>
					</div>
					<div className="col">
						<div className="card text-secondary shadow-lg  mb-4 bg-body rounded">
							<img src={categoria5} className="card-img-top" alt="..." />
							<div className="card-body p-4">
								<h4 className="lead fw-bold card-title">Gourmet</h4>
							</div>
						</div>
					</div>
					<div className="col">
						<div className="card text-secondary shadow-lg  mb-4 bg-body rounded">
							<img src={chifa} className="card-img-top" alt="..." />
							<div className="card-body p-4">
								<h4 className="lead fw-bold card-title">Chifa</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid bg-dark text-white pt-5 mt-5">
				<div className="container ">
					<div className="row align-items-center ">
						<div className="col-sm-12 col-md-5 col-lg-4 offset-lg-1 offset-xl-2">
							<h2 className=" mb-3 fw-bold">Pide sin complicaciones</h2>
							<p className=" ">
								¿Quieres sushi, una hamburguesa o una pizza? Con DiDi Food pedir es fácil y rápido.
								¿No tienes efectivo? No te preocupes, también puedes pagar con tarjeta de crédito.
								Nuestra prioridad es que recibas la comida directamente en tu puerta.
							</p>
						</div>
						<div className="col-sm-12 col-md-5 col-lg-5 offset-lg-1 pt-5 pt-sm-3 ">
							<img src={pedido} width="331" className="img-fluid " alt="..." />
						</div>
					</div>
				</div>
			</div>
			<div className="container ">
				<div className="row mt-5 justify-content-center">
					<div className="col-sm-6 mb-3 ">
						<div className="card  px-2 py-5" style={{ background: '#EBF5FB' }}>
							<div className="row  g-0 align-items-center">
								<div className="col-sm-12 col-md-12 col-lg-6">
									<img src={delivery} className=" img-fluid rounded-start" alt="..." />
								</div>
								<div className="col-sm-12 col-md-12 col-lg-6">
									<div className="card-body">
										<h3 className="card-title fw-bold " style={{ fontFamily: 'sans-serif' }}>
											Gran variedad
										</h3>
										<p className="card-text">
											En Fusion Food podrás encontrar una gran variedad de tipos de comidas, desde
											exquisitas fusiones de cocina asiática y latinoamericana hasta innovadores
											platos de la cocina mediterránea. platos de la cocina mediterránea.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm-6 mb-3">
						<div className="card px-2 py-5" style={{ background: '#FDF2E9 ' }}>
							<div className="row  g-0 align-items-center">
								<div className="col-sm-12 col-md-12 col-lg-6 ">
									<img src={delivery} className=" img-fluid rounded-start" alt="..." />
								</div>
								<div className="col-sm-12 col-md-12 col-lg-6">
									<div className="card-body">
										<h3 className="card-title">Entrega rápida</h3>
										<p className="card-text">
											En Fusion Food podrás encontrar una gran variedad de tipos de comidas, desde
											exquisitas fusiones de cocina asiática y latinoamericana hasta innovadores
											platos de la cocina mediterránea. platos de la cocina mediterránea.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="btn-group">
				<button
					type="button"
					className="btn btn-danger dropdown-toggle"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Action
				</button>
				<ul className="dropdown-menu">
					<li>
						<a className="dropdown-item" href="#">
							Action
						</a>
					</li>
					<li>
						<a className="dropdown-item" href="#">
							Another action
						</a>
					</li>
					<li>
						<a className="dropdown-item" href="#">
							Something else here
						</a>
					</li>

					<li>
						<a className="dropdown-item" href="#">
							Separated link
						</a>
					</li>
				</ul>
			</div>
			<h2>hola mundo</h2>
			<div className="d-flex  align-items-center ">
				<p className=" m-0">fgdf </p>
				<div className="btn-group">
					<a
						type="button"
						className="btn btn-danger dropdown-toggle"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<i className=" bi bi-person-circle fs-4  ms-2"></i>
					</a>
					<ul className="dropdown-menu">
						<li>
							<a className="dropdown-item" href="#">
								Action
							</a>
						</li>
						<li>
							<a className="dropdown-item" href="#">
								Another action
							</a>
						</li>
						<li>
							<a className="dropdown-item" href="#">
								Something else here
							</a>
						</li>
					</ul>
				</div>

				<a className="mx-5 my-3 text-center">
					<p className="fw-bold">FFFFF</p>
				</a>
				<button type="button" className="btn btn-link">
					Link
				</button>
			</div>
		</>
	);
};

export default index;
