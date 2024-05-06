export default interface LoginResponse {
	security: Security;
}
export interface Security {
	tokenType: string;
	accesToken: string;
	expireOn: string;
}
