import FooterPage from '@/modules/shared/navbar/FooterPage';
import NavbarPage from '@/modules/shared/navbar/NavbarPage';
import '../../../layouts/views/static/css/theme.min2.css';
import { useCart } from '@/modules/dashboard/food/application/useCar';
import { useNavigate } from 'react-router';
import '../pago/styles/pago.css';
import { Table } from 'react-bootstrap';

const index = () => {
	const navigate = useNavigate();
	const { carritoLista: data, total, aumentar, disminuir, removeFromCart } = useCart();

	const handleButtonClick = () => {
		navigate(`/checkout-pay`);
	};
	const handleIncrement = (id: number, cantidad: number) => {
		if (cantidad < 5) {
			aumentar(id);
		}
	};
	const handleDecrement = (id: number) => {
		disminuir(id);
	};
	return (
		<>
			<main className="page-wrapper">
				<NavbarPage />
				<div style={{ paddingTop: '150px', paddingBottom: '150px' }}>
					<div className="container ">
						<h3 className="text-dark">Tu Orden</h3>
						<div className="row ">
							<div className="col-md-9 ">
								<div className="table-responsive">
									<Table hover>
										<thead className="bg-secondary">
											<tr>
												<th> Pedido</th>
												<th></th>
												<th>Cantidad</th>
												<th>Precio</th>
												<th>Importe</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{data?.map((item, key) => (
												<tr key={key}>
													<td>
														<img
															src={item.imgFire}
															className="img-fluid"
															style={{ width: '60px', height: '60px' }}
														/>
													</td>
													<td>{item.nombre}</td>
													<td>
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
																<i className="fa-solid fa-circle-minus"></i>
															</button>
															<button type="button" className="btn btn-outline-dark py-0 px-2">
																<small>{item.cantidad}</small>
															</button>
															<button
																type="button"
																className="btn btn-outline-dark py-0 px-2"
																onClick={() => handleIncrement(item.id, item.cantidad)}
															>
																<small>
																	{' '}
																	<i className="fa-solid fa-circle-plus"></i>
																</small>
															</button>
														</div>
													</td>
													<td>
														{' '}
														{item.precio.toLocaleString('es-PE', {
															style: 'currency',
															currency: 'PEN',
														})}
													</td>
													<td>
														{(item.precio * item.cantidad).toLocaleString('es-PE', {
															style: 'currency',
															currency: 'PEN',
														})}
													</td>
													<td>
														<a>
															{' '}
															<i
																className="bi bi-trash3 text-danger fw-bold"
																onClick={() => removeFromCart(item.id)}
															></i>
														</a>
													</td>
												</tr>
											))}
										</tbody>
									</Table>
								</div>
							</div>
							<div className="col-md-3 bg-secondary ">
								<h4 className="mt-2">Resumen</h4>
								<hr />
								<div className="row ">
									<div className="col-6">
										<p>Subtotal</p>
									</div>
									<div className="col-6">
										<p> {total()}</p>
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col">
										<p>Total</p>
									</div>
									<div className="col">
										<p className="fw-bold"> {total()}</p>
									</div>
								</div>
								<hr />
								<br />
								<div className="d-grid gap-2">
									<button className="btn  btn-success" onClick={handleButtonClick}>
										Pagar
									</button>
								</div>
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
