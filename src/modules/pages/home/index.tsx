import '../../../layouts/views/static/css/theme.min2.css';

import banner from '../../../core/imagenes/hero-bg.jpg';

import categoria1 from '../../../core/imagenes/category/01.jpg';
import categoria2 from '../../../core/imagenes/category/02.jpg';
import chifa from '../../../core/imagenes/category/chifa2.png';
import categoria4 from '../../../core/imagenes/category/04.jpg';
import categoria5 from '../../../core/imagenes/category/05.jpg';
import polleria from '../../../core/imagenes/category/polleria.jpg';
import pedido from '../../../core/imagenes/phone.png';
import delivery from '../../../core/imagenes/variedad.jpg';
import NavbarPage from '@/modules/shared/navbar/NavbarPage';
import FooterPage from '@/modules/shared/navbar/FooterPage';

const index = () => {
	return (
		<>
			<main className="page-wrapper">
				<NavbarPage />

				<section
					className="bg-darker bg-size-cover bg-position-center py-5 py-lg-10"
					style={{ backgroundImage: `url(${banner})` }}
				>
					<div className="container pb-5">
						<div className="row justify-content-center pb-5">
							<div className="col-xl-6 col-lg-7 col-md-8 col-sm-10 text-center">
								<h5 className="text-light fw-light">Sevicio de delivery</h5>

								<div className="h1 text-light mb-3 pb-4">
									Entregamos tu comida favorita fresca y rápida en
									<div className="dropdown d-inline-block ms-1">
										<a className="text-info" href="#" data-bs-toggle="dropdown">
											FusionFood
										</a>
									</div>
								</div>
								<a className="btn btn-danger" href="#cuisine" data-scroll>
									Que quieres comer?
								</a>
							</div>
						</div>
					</div>
				</section>

				<section className="container py-4 my-lg-3 py-sm-5" id="cuisine">
					<h2 className="text-center pt-4 pt-sm-3">Nuestros platillos populares</h2>
					<p className="text-muted text-center mb-5">Elige lo que quieras y nosotros te lo dimos</p>
					<div className="row">
						<div className="col-md-4 col-sm-6 mb-grid-gutter">
							<a className="card border-0 shadow" href="food-delivery-category.html">
								<img className="card-img-top" src={categoria1} alt="Burgers &amp; Fries" />
								<div className="card-body py-4 text-center">
									<h3 className="h5 mt-1">Hamburgesas</h3>
								</div>
							</a>
						</div>
						<div className="col-md-4 col-sm-6 mb-grid-gutter">
							<a className="card border-0 shadow" href="food-delivery-category.html">
								<img className="card-img-top" src={categoria2} alt="Noodles" />
								<div className="card-body py-4 text-center">
									<h3 className="h5 mt-1">Pastas</h3>
								</div>
							</a>
						</div>
						<div className="col-md-4 col-sm-6 mb-grid-gutter">
							<a className="card border-0 shadow" href="food-delivery-category.html">
								<img className="card-img-top" src={polleria} alt="Sushi &amp; Rolls" />
								<div className="card-body py-4 text-center">
									<h3 className="h5 mt-1">Polleria</h3>
								</div>
							</a>
						</div>
						<div className="col-md-4 col-sm-6 mb-grid-gutter">
							<a className="card border-0 shadow" href="food-delivery-category.html">
								<img className="card-img-top" src={categoria4} alt="Pizza &amp; Pasta" />
								<div className="card-body py-4 text-center">
									<h3 className="h5 mt-1">Pizzas</h3>
								</div>
							</a>
						</div>
						<div className="col-md-4 col-sm-6 mb-grid-gutter">
							<a className="card border-0 shadow" href="food-delivery-category.html">
								<img className="card-img-top" src={categoria5} alt="Coffee &amp; Desserts" />
								<div className="card-body py-4 text-center">
									<h3 className="h5 mt-1">Gourmet</h3>
								</div>
							</a>
						</div>
						<div className="col-md-4 col-sm-6 mb-grid-gutter">
							<a className="card border-0 shadow" href="food-delivery-category.html">
								<img className="card-img-top" src={chifa} alt="Healthy &amp; Food" />
								<div className="card-body py-4 text-center">
									<h3 className="h5 mt-1">Chifa</h3>
								</div>
							</a>
						</div>
					</div>
				</section>

				<section className="bg-dark bg-size-cover bg-position-center pt-5">
					<div className="container pt-2 pt-sm-0">
						<div className="row align-items-center">
							<div className="col-xl-4 col-lg-5 col-sm-6 offset-xl-2 offset-lg-1 mt-md-n5 text-center text-sm-start">
								<h2 className="text-light mb-3">Pide sin complicaciones</h2>
								<p className="text-light opacity-70 mb-0 d-block d-sm-none d-md-block">
									¿Quieres sushi, una hamburguesa o una pizza? Con DiDi Food pedir es fácil y
									rápido. ¿No tienes efectivo? No te preocupes, también puedes pagar con tarjeta de
									crédito. Nuestra prioridad es que recibas la comida directamente en tu puerta.
								</p>
							</div>
							<div className="col-lg-5 col-sm-6 offset-lg-1 pt-5 pt-sm-3">
								<img
									className="d-block mx-auto mx-sm-0"
									src={pedido}
									width="331"
									alt="Mobile App Screen"
								/>
							</div>
						</div>
					</div>
				</section>
				<section className="container pb-4 pt-lg-5 pb-sm-5">
					<div className="row pt-4 mt-2 mt-lg-3 mb-md-2">
						<div className=" col-lg-6 mb-grid-gutter">
							<div className="d-block d-sm-flex justify-content-between align-items-center bg-faded-info rounded-3">
								<div className="pt-5 py-sm-5 px-4 ps-md-5 pe-md-0 text-center text-sm-start">
									<h2>Gran variedad </h2>
									<p className="text-muted pb-2">
										En Fusion Food podrás encontrar una gran variedad de tipos de comidas, desde
										exquisitas fusiones de cocina asiática y latinoamericana hasta innovadores
										platos de la cocina mediterránea.
									</p>
								</div>
								<img
									className="d-block mx-auto mx-sm-0"
									src={delivery}
									width="272"
									alt="Become a Courier"
								/>
							</div>
						</div>
						<div className="col-lg-6 mb-grid-gutter">
							<div className="d-block d-sm-flex justify-content-between align-items-center bg-faded-warning rounded-3">
								<div className="pt-5 py-sm-5 px-4 ps-md-5 pe-md-0 text-center text-sm-start">
									<h2>Entrega rápida</h2>
									<p className="text-muted pb-2">
										Los socios repartidores expertos de FusionFood garantizan que los pedidos se
										entreguen rápidamente y en perfectas condiciones, ofreciendo comodidad y
										flexibilidad a nuestros clientes.
									</p>
								</div>
								<img
									className="d-block mx-auto mx-sm-0"
									src={delivery}
									width="269"
									alt="Become a Partner"
								/>
							</div>
						</div>
					</div>
				</section>
			</main>

			<FooterPage />
		</>
	);
};

export default index;
