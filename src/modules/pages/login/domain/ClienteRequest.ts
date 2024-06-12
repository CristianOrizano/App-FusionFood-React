export default interface ClienteRequest {
	nombres: string;
	apellidos: string;
	fechaNacimiento: string | null;
	telefono: number | null;
	nimagen?: string | null;
	correo: string;
	contrasena: string;
}
