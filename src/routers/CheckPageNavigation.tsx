import { isValidAuthorization } from '@/core/sessions/LocalStorageSession';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface BaseProps {
	children: ReactElement;
}
export const PrivateOutlet = ({ children }: BaseProps): JSX.Element => {
	const auth = isValidAuthorization();
	console.log('estado', auth);

	if (!auth) return <Navigate to="/login" replace />;

	return children;
};

export const PublicOutlet = ({ children }: BaseProps): JSX.Element => {
	const auth = isValidAuthorization();

	if (auth) return <Navigate to="/" replace />;

	return children;
};
