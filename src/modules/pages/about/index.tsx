import NavbarPage from '@/modules/shared/navbar/NavbarPage';
import bannerabout from '../../../core/imagenes/fondo2.jpg';
import about from '../../../core/imagenes/about2.png';
import '../../../layouts/views/static/css/theme.min2.css';
import FooterPage from '@/modules/shared/navbar/FooterPage';

const index = () => {
	return (
		<>
			<main className="page-wrapper">
				<NavbarPage />
				<section
					className="bg-darker bg-size-cover bg-position-center py-5 d-flex align-items-center"
					style={{ backgroundImage: `url(${bannerabout})`, width: '100%', minHeight: '300px' }}
				>
					<div className="container py-md-4 text-center">
						<h1 className="text-secondary pt-5 fw-bold">Acerca de Nosotros</h1>
					</div>
				</section>
				<div className="container py-5  mb-5">
					<div className="row align-items-center">
						<div className="col-sm-12 col-md-6 col-lg-6   ">
							<img
								className="img-fluid"
								src={about}
								style={{ maxWidth: '100%', height: 'auto' }}
								alt="Noodles"
							/>
						</div>
						<div className="col-sm-12 col-md-6 col-lg-6 ">
							<h2 className="text-center  mt-3 text-danger">Sobre nuestro restaurante</h2>
							<p className=" mt-4">
								En FusionFood, nuestra misión es ofrecer a nuestros usuarios una experiencia
								gastronómica única y accesible. Queremos conectar a los amantes de la comida con una
								variedad de platillos deliciosos y auténticos, preparados por los mejores
								restaurantes locales y entregados directamente a sus puertas.
							</p>
							<p className="">
								<strong>Nuestra Visión:</strong> Aspiramos a ser la plataforma líder en la entrega
								de alimentos, reconocida por nuestra excelencia en el servicio al cliente, la
								calidad de los platillos ofrecidos y nuestro compromiso con la sostenibilidad y el
								apoyo a los negocios locales.
							</p>
							<p className="">
								<strong>Nuestro Valores:</strong>
								<ul>
									<li>
										<strong>Calidad:</strong> Nos comprometemos a ofrecer siempre los mejores y más
										frescos ingredientes en cada platillo.
									</li>
									<li>
										<strong>Conveniencia:</strong> Facilitamos el proceso de ordenar comida con una
										plataforma intuitiva y fácil de usar.
									</li>
									<li>
										<strong>Diversidad:</strong> Celebramos la diversidad culinaria ofreciendo una
										amplia gama de opciones para satisfacer todos los gustos y preferencias
										dietéticas.
									</li>
									<li>
										<strong>Sostenibilidad:</strong> Promovemos prácticas sostenibles y apoyamos a
										restaurantes que comparten nuestros valores ecológicos.
									</li>
								</ul>
							</p>
						</div>
					</div>
				</div>
			</main>
			<FooterPage />
		</>
	);
};

export default index;
