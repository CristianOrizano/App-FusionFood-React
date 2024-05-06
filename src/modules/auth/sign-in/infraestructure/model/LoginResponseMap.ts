export default interface LoginResponseMap {
	security: Security;
}

export interface Security {
	tokenType: string;
	accesToken: string;
	expireOn: string;
}
