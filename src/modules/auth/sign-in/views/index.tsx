import avatar from '@/./core/imagenes/fondo2.jpg';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { LoginRequest, LoginResponse } from '../domain';
import * as Yup from 'yup';
import useLogin from '../application/useLogin';
import { LocalStorageSession } from '@/core/sessions';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

interface DataMessage {
	Message: string;
}

const index = () => {
	const navigate = useNavigate();
	const formik = useFormik<LoginRequest>({
		initialValues: {
			username: '',
			password: '',
		},
		validationSchema: Yup.object({
			username: Yup.string().required('Username es requerido'),
			password: Yup.string().required('Password es requerido'),
		}),
		onSubmit: (values: LoginRequest) => {
			console.log('Values: ', values);
			void loginAuth(values);
		},
	});

	// React Query
	const { mutateAsync, isSuccess, isError } = useLogin();

	// Methods
	const loginAuth = async (payload: LoginRequest): Promise<void> => {
		try {
			const response: LoginResponse = await mutateAsync(payload);

			LocalStorageSession.saveAuthorization(response);
			navigate('/dashboard');
		} catch (error) {
			const err = error as AxiosError;
			const data = err?.response?.data as DataMessage;

			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: `${data.Message}`,
			});
		}
	};

	const backgroundImageStyle = {
		backgroundImage: `url(${avatar})`,
		backgroundSize: 'cover', // Ajustar el tamaño de la imagen para cubrir todo el div
		backgroundPosition: 'center', // Centrar la imagen
	};
	return (
		<>
			<div className="d-flex w-100 " style={backgroundImageStyle}>
				<div className="container d-flex flex-column">
					<div className="row vh-100">
						<div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
							<div className="d-table-cell align-middle">
								<div className="text-center mt-4">
									<h1 className="h2 text-white">Iniciar Sesion!</h1>
									<p className="lead text-white">Sign in to your account to continue</p>
								</div>

								<div className="card">
									<div className="card-body">
										<div className="m-sm-3">
											<form onSubmit={formik.handleSubmit}>
												<div className="mb-3">
													<label className="form-label">Usuario</label>
													<input
														className="form-control form-control-lg"
														name="username"
														placeholder="Ingrese su usuario"
														value={formik.values.username}
														onChange={formik.handleChange}
													/>
													{(formik.touched.username ?? false) && formik.errors.username != null && (
														<small className="text-danger">{formik.errors.username}</small>
													)}
												</div>
												<div className="mb-3">
													<label className="form-label">Password</label>
													<input
														className="form-control form-control-lg"
														type="password"
														name="password"
														placeholder="Ingrese su password"
														value={formik.values.password}
														onChange={formik.handleChange}
													/>
													{(formik.touched.password ?? false) && formik.errors.password != null && (
														<small className="text-danger">{formik.errors.password}</small>
													)}
												</div>
												<div></div>
												<div className="d-grid gap-2 mt-3">
													<button className="btn btn-lg btn-primary" type="submit">
														{' '}
														Sign in
													</button>
												</div>
											</form>
										</div>
									</div>
								</div>
								<div className="text-center mb-3">
									Don't have an account? <a href="pages-sign-up.html">Sign up</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default index;
