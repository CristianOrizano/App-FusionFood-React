import logo from '../../../core/imagenes/logoDash.png';

const FooterPage = () => {
	return (
		<>
			<footer className="footer bg-darker pt-5">
				<div className="container pt-2">
					<div className="row pb-2">
						<div className="col-lg-2 col-sm-4 pb-2 mb-4">
							<div className="mt-n1">
								<a className="d-inline-block align-middle" href="#">
									<img className="d-block mb-4" src={logo} width="117" alt="FusionFood" />
								</a>
							</div>
						</div>
						<div className="col-lg-2 col-sm-4">
							<div className="widget widget-links widget-light pb-2 mb-4">
								<h3 className="widget-title text-light">Únete a Nosotros</h3>
								<ul className="widget-list">
									<li className="widget-list-item">
										<a className="widget-list-link" href="#">
											Carreras
										</a>
									</li>
									<li className="widget-list-item">
										<a className="widget-list-link" href="#">
											Restaurantes Asociados
										</a>
									</li>
									<li className="widget-list-item">
										<a className="widget-list-link" href="#">
											Conviértete en Repartidor
										</a>
									</li>
									<li className="widget-list-item">
										<a className="widget-list-link" href="#">
											Acerca de FusionFood
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-lg-2 col-sm-4">
							<div className="widget widget-links widget-light pb-2 mb-4">
								<h3 className="widget-title text-light">Ayuda</h3>
								<ul className="widget-list">
									<li className="widget-list-item">
										<a className="widget-list-link" href="#">
											Centro de Ayuda
										</a>
									</li>
									<li className="widget-list-item">
										<a className="widget-list-link" href="#">
											Soporte
										</a>
									</li>
									<li className="widget-list-item">
										<a className="widget-list-link" href="#">
											Contacto
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-lg-2 col-sm-4">
							<div className="widget widget-links widget-light pb-2 mb-4">
								<h3 className="widget-title text-light">Síguenos</h3>
								<ul className="widget-list">
									<li className="widget-list-item">
										<a className="widget-list-link" href="#">
											Facebook
										</a>
									</li>
									<li className="widget-list-item">
										<a className="widget-list-link" href="#">
											Twitter
										</a>
									</li>
									<li className="widget-list-item">
										<a className="widget-list-link" href="#">
											Instagram
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-lg-4 col-sm-8">
							<div className="widget pb-2 mb-4">
								<h3 className="widget-title text-light pb-1">Descarga nuestra app</h3>
								<div className="d-flex flex-wrap">
									<a
										className="btn-market btn-apple border border-light me-3 mb-2"
										href="#"
										role="button"
									>
										<span className="btn-market-subtitle">Disponible en</span>
										<span className="btn-market-title">App Store</span>
									</a>
									<a
										className="btn-market btn-google border border-light mb-2"
										href="#"
										role="button"
									>
										<span className="btn-market-subtitle">Disponible en</span>
										<span className="btn-market-title">Google Play</span>
									</a>
								</div>
							</div>
						</div>
					</div>

					<div className="d-md-flex justify-content-between pt-4 pb-1">
						<div className="pb-4 fs-xs text-light opacity-50 text-center text-md-start">
							© Todos los derechos reservados. Hecho por{' '}
							<a
								className="text-light"
								href="https://createx.studio/"
								target="_blank"
								rel="noopener"
							>
								Createx Studio
							</a>
						</div>
						<div className="widget widget-links widget-light pb-4">
							<ul className="widget-list d-flex flex-wrap justify-content-center justify-content-md-start">
								<li className="widget-list-item ms-4">
									<a className="widget-list-link fs-ms" href="#">
										Política de Privacidad
									</a>
								</li>
								<li className="widget-list-item ms-4">
									<a className="widget-list-link fs-ms" href="#">
										Términos y Condiciones
									</a>
								</li>
								<li className="widget-list-item ms-4">
									<a className="widget-list-link fs-ms" href="#">
										Política de Cookies
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default FooterPage;
