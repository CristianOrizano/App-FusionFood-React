import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { PrivateOutlet } from './CheckPageNavigation';

const routes: RouteObject[] = [
	{
		path: '/dashboard',
		async lazy() {
			const { default: AdminLayout } = await import('../layouts/views/Admin');
			return {
				element: <PrivateOutlet>{<AdminLayout />}</PrivateOutlet>,
			};
		},
		children: [
			{
				path: 'categoria',
				async lazy() {
					const { default: Categoria } = await import(
						'../modules/dashboard/categorias/views/index'
					);
					return { Component: Categoria };
				},
			},
			{
				path: 'foodmenu',
				async lazy() {
					const { default: food } = await import('../modules/dashboard/food/views/index');
					return { Component: food };
				},
			},
		],
	},
	{
		path: '/login',
		async lazy() {
			const { default: LoginLayout } = await import('../modules/auth/sign-in/views/index');
			return { element: <LoginLayout /> };
		},
	},
];

export default createBrowserRouter(routes);
