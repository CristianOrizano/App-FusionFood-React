import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { PrivateOutlet } from './CheckPageNavigation';

const routes: RouteObject[] = [
	{
		path: '/',
		async lazy() {
			const { default: HomeLayout } = await import('../modules/pages/home/index');
			return { element: <HomeLayout /> };
		},
	},
	{
		path: '/menu',
		async lazy() {
			const { default: MenuLayout } = await import('../modules/pages/menu/view/index');
			return { element: <MenuLayout /> };
		},
	},
	{
		path: '/test',
		async lazy() {
			const { default: TestLayout } = await import('../modules/pages/test/index');
			return { element: <TestLayout /> };
		},
	},
	{
		path: '/menu/:query',
		async lazy() {
			const { default: MenuLayout } = await import('../modules/pages/menu/view/index');
			return { element: <MenuLayout /> };
		},
	},
	{
		path: '/about',
		async lazy() {
			const { default: AboutLayout } = await import('../modules/pages/about/index');
			return { element: <AboutLayout /> };
		},
	},
	{
		path: '/dashboard',
		async lazy() {
			const { default: DashLayout } = await import('../layouts/views/Admin');
			return {
				element: <PrivateOutlet>{<DashLayout />}</PrivateOutlet>,
			};
		},
		children: [
			{
				index: true,
				async lazy() {
					const { default: Home } = await import('../modules/dashboard/home/views/index');
					return { Component: Home };
				},
			},
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
