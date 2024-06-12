export default interface UsuarioResponse {
	id: number;
	nombre: string;
	apellido: string;
	email: string;
	username: string;
	nombreImg?: string;
	imgFire?: string;
	password: string;
	idRole: number;
	estado: boolean;
}
