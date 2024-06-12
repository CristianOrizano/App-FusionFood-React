import { LocalStorageSession, LocalStorageSessionCliente } from '@/core/sessions';
import useClienteCreate from '@/modules/pages/login/application/useClienteCreate';
import useClienteLogin from '@/modules/pages/login/application/useClienteLogin';
import { ClienteLogin, ClienteRequest, ClienteResponse } from '@/modules/pages/login/domain';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Modal, ModalProps, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

export interface ModalLoginRef {
	openModal: (id?: number) => void;
	closeModal?: () => void;
}
interface DataMessage {
	Message: string;
}
const ModalLogin = forwardRef<ModalLoginRef, ModalProps>((_, ref) => {
	const [id, setId] = useState<number>();
	const [show, setShow] = useState<boolean>(false);

	const [key, setKey] = useState('login');
	const [isProfileEnabled, setIsProfileEnabled] = useState(false);

	const navigate = useNavigate();

	const formik = useFormik<ClienteLogin>({
		initialValues: {
			username: '',
			password: '',
		},
		validationSchema: Yup.object({
			username: Yup.string().required('Username es requerido'),
			password: Yup.string().required('Password es requerido'),
		}),
		onSubmit: (values: ClienteLogin) => {
			console.log('Values: ', values);
			void loginAuth(values);
		},
	});

	const formikRegister = useFormik<ClienteRequest>({
		initialValues: {
			nombres: '',
			apellidos: '',
			fechaNacimiento: '2001-10-10',
			telefono: 0,
			nimagen: null,
			correo: '',
			contrasena: '',
		},
		validationSchema: Yup.object({
			nombres: Yup.string().required('nombres es requerido'),
			apellidos: Yup.string().required('apellidos es requerido'),
			fechaNacimiento: Yup.string().required('Fecha es requerido'),
			correo: Yup.string().required('correo es requerido'),
			contrasena: Yup.string().required('contrasena es requerido'),
		}),
		onSubmit: (values: ClienteRequest) => {
			console.log('Values: ', values);
			void registrar(values);
		},
	});

	// React Query
	const { mutateAsync, isSuccess, isError } = useClienteLogin();
	const { mutateAsync: register } = useClienteCreate();

	// Methods
	const loginAuth = async (payload: ClienteLogin): Promise<void> => {
		try {
			const response: ClienteResponse = await mutateAsync(payload);
			LocalStorageSessionCliente.saveAuthorization(response);
			closeModal();
			navigate('/');
			Swal.fire({
				title: 'Correcto!',
				text: 'Exito al Iniciar!',
				icon: 'success',
			});
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
	const registrar = async (payload: ClienteRequest): Promise<void> => {
		try {
			const response: ClienteResponse = await register(payload);
			setKey('login');
			Swal.fire({
				title: 'Correcto!',
				text: 'Exito al Registrar!',
				icon: 'success',
			});
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

	const enableProfileTab = () => {
		setIsProfileEnabled(true);
		setKey('login');
	};
	// Methods
	const openModal = (id?: number): void => {
		setShow(true);
		setId(id);
		// console.log('id', id);
	};

	const closeModal = (): void => {
		setKey('login');
		setShow(false);
		setId(undefined);
		formik.resetForm();
		formikRegister.resetForm();
	};
	// ImperativeHandle
	useImperativeHandle(ref, () => {
		return {
			openModal,
			closeModal,
		};
	});
	return (
		<>
			<Modal show={show} onHide={closeModal} backdrop="static" centered>
				<Modal.Header closeButton></Modal.Header>
				<Tabs
					id="uncontrolled-tab-example"
					className="mb-3"
					activeKey={key}
					onSelect={k => {
						if (k !== null) {
							setKey(k);
						}
					}}
					fill
				>
					<Tab eventKey="login" title="Iniciar Sesion">
						<div className="row px-3">
							<form onSubmit={formik.handleSubmit}>
								<div className="col-12">
									<div className="mb-3">
										<label className="form-label">Correo</label>
										<input
											className="form-control"
											name="username"
											type="email"
											placeholder="Ingrese su Correo"
											value={formik.values.username}
											onChange={formik.handleChange}
										/>
										{(formik.touched.username ?? false) && formik.errors.username != null && (
											<small className="text-danger">{formik.errors.username}</small>
										)}
									</div>
								</div>
								<div className="col-12">
									<div className="mb-3">
										<label className="form-label">Contraseña</label>
										<input
											className="form-control"
											type="text"
											name="password"
											placeholder="Ingrese su Contraseña"
											value={formik.values.password}
											onChange={formik.handleChange}
										/>
										{(formik.touched.password ?? false) && formik.errors.password != null && (
											<small className="text-danger">{formik.errors.password}</small>
										)}
									</div>
								</div>
								<div className="col-12">
									<div className="mb-3">
										<button className="btn btn-dark btn-shadow d-block w-100" type="submit">
											Iniciar
										</button>
									</div>
								</div>
							</form>
						</div>
					</Tab>
					<Tab eventKey="register" title="Registrarse">
						<div className="row px-3">
							<form onSubmit={formikRegister.handleSubmit}>
								<div className="col-12">
									<div className="mb-3">
										<label className="form-label">Nombres</label>
										<input
											className="form-control"
											name="nombres"
											type="text"
											placeholder="Ingrese Nombres"
											value={formikRegister.values.nombres}
											onChange={formikRegister.handleChange}
										/>
										{(formikRegister.touched.nombres ?? false) &&
											formikRegister.errors.nombres != null && (
												<small className="text-danger">{formikRegister.errors.nombres}</small>
											)}
									</div>
								</div>
								<div className="col-12">
									<div className="mb-3">
										<label className="form-label">Apellidos</label>
										<input
											className="form-control"
											name="apellidos"
											type="text"
											placeholder="Ingrese Apellidos"
											value={formikRegister.values.apellidos}
											onChange={formikRegister.handleChange}
										/>
										{(formikRegister.touched.apellidos ?? false) &&
											formikRegister.errors.apellidos != null && (
												<small className="text-danger">{formikRegister.errors.apellidos}</small>
											)}
									</div>
								</div>

								<div className="col-12">
									<div className="mb-3">
										<label className="form-label">Telefono</label>
										<input
											className="form-control"
											name="telefono"
											type="number"
											placeholder="Ingrese Telefono"
											value={formikRegister.values.telefono ?? ''}
											onChange={formikRegister.handleChange}
										/>
										{(formikRegister.touched.telefono ?? false) &&
											formikRegister.errors.telefono != null && (
												<small className="text-danger">{formikRegister.errors.telefono}</small>
											)}
									</div>
								</div>
								<div className="col-12">
									<div className="mb-3">
										<label className="form-label">Fecha Nacimiento</label>
										<input
											className="form-control"
											name="fechaNacimiento"
											type="date"
											placeholder="Ingrese Fecha"
											value={formikRegister.values.fechaNacimiento ?? ''}
											onChange={formikRegister.handleChange}
										/>
										{(formikRegister.touched.fechaNacimiento ?? false) &&
											formikRegister.errors.fechaNacimiento != null && (
												<small className="text-danger">
													{formikRegister.errors.fechaNacimiento}
												</small>
											)}
									</div>
								</div>
								<div className="col-12">
									<div className="mb-3">
										<label className="form-label">Correo</label>
										<input
											className="form-control"
											name="correo"
											type="text"
											placeholder="Ingrese Correo"
											value={formikRegister.values.correo}
											onChange={formikRegister.handleChange}
										/>
										{(formikRegister.touched.correo ?? false) &&
											formikRegister.errors.correo != null && (
												<small className="text-danger">{formikRegister.errors.correo}</small>
											)}
									</div>
								</div>
								<div className="col-12">
									<div className="mb-3">
										<label className="form-label">Contraseña</label>
										<input
											className="form-control"
											name="contrasena"
											type="text"
											placeholder="Ingrese Contraseña"
											value={formikRegister.values.contrasena}
											onChange={formikRegister.handleChange}
										/>
										{(formikRegister.touched.contrasena ?? false) &&
											formikRegister.errors.contrasena != null && (
												<small className="text-danger">{formikRegister.errors.contrasena}</small>
											)}
									</div>
								</div>
								<div className="col-12">
									<div className="mb-3">
										<button className="btn btn-dark btn-shadow d-block w-100" type="submit">
											Registrarse
										</button>
									</div>
								</div>
							</form>
						</div>
					</Tab>
				</Tabs>
			</Modal>
		</>
	);
});

export default ModalLogin;
