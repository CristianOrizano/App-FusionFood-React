export default interface ClienteResponse {
	id: number;
	nombres: string;
	apellidos: string;
	fechaNacimiento: string;
	telefono: number | null;
	imgFire?: string;
	nimagen?: string | null;
	correo: string;
	contrasena: string;
	estado: boolean;
}
