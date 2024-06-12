import NavbarPage from '@/modules/shared/navbar/NavbarPage';
import '../../../layouts/views/static/css/theme.min2.css';
import contact from '@/core/imagenes/contact7.png';

import FooterPage from '@/modules/shared/navbar/FooterPage';

const index = () => {
	return (
		<>
			<main className="page-wrapper">
				<NavbarPage />

				<div style={{ paddingTop: '100px', paddingBottom: '100px' }}>
					<div className="container mt-5 mb-5">
						<div className="row justify-content-center ">
							<div className="col-md-4">
								<img
									className="rounded img-fluid"
									src={contact}
									style={{ maxWidth: '100%' }}
									alt="Noodles"
								/>
							</div>
							<div className="col-md-7 card p-2">
								<h1 className="text-center fw-bold">Contactanos</h1>
								<div className="row">
									<div className="col-12 col-md-12">
										<div className="mb-3">
											<label className="form-label">Nombres</label>
											<input
												className="form-control"
												name="nombres"
												type="text"
												disabled
												placeholder="Ingrese Nombres"
											/>
										</div>
									</div>
									<div className="col-12 col-md-12">
										<div className="mb-3">
											<label className="form-label">Apellidos</label>
											<input
												className="form-control"
												name="apellidos"
												type="text"
												disabled
												placeholder="Ingrese Apellidos"
											/>
										</div>
									</div>
									<div className="col-12 col-md-12">
										<div className="mb-3">
											<label className="form-label">Correo</label>
											<input
												className="form-control"
												name="correo"
												type="text"
												disabled
												placeholder="Ingrese Correo"
											/>
										</div>
									</div>
									<div className="col-12 col-md-6">
										<div className="mb-3">
											<label className="form-label">Telefono</label>
											<input
												className="form-control"
												name="telefono"
												type="number"
												placeholder="Ingrese Telefono"
											/>
										</div>
									</div>
									<div className="col-12 col-md-6">
										<div className="mb-3">
											<label className="form-label">Motivo</label>
											<input
												className="form-control"
												name="telefono"
												type="number"
												placeholder="Ingrese Motivo"
											/>
										</div>
									</div>

									<div className="col-12 col-md-12">
										<div className="mb-3">
											<label className="form-label">Comentarios</label>
											<textarea
												className="form-control"
												rows={5}
												placeholder="Ingrese Comentarios"
											/>
										</div>
									</div>
								</div>
								<button className="btn btn-dark w-100 mt-3" type="submit">
									Enviar Mensaje
								</button>
							</div>
						</div>
					</div>
				</div>
				<FooterPage />
			</main>
		</>
	);
};

export default index;
