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
		path: '/menu/:category?',
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
		path: '/menu/search/:query?',
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
		path: '/contact',
		async lazy() {
			const { default: ContactLayout } = await import('../modules/pages/contact/index');
			return { element: <ContactLayout /> };
		},
	},
	{
		path: '/checkout',
		async lazy() {
			const { default: CheckLayout } = await import('../modules/pages/pago/index');
			return { element: <CheckLayout /> };
		},
	},
	{
		path: '/checkout-pay',
		async lazy() {
			const { default: CheckPayLayout } = await import('../modules/pages/pago/components/cuenta');
			return { element: <CheckPayLayout /> };
		},
	},
	{
		path: '/profile',
		async lazy() {
			const { default: ProfileLayout } = await import('../modules/pages/profile/index');
			return { element: <ProfileLayout /> };
		},
	},
	{
		path: '/dashboard',
		async lazy() {
			const { default: DashLayout } = await import('../layouts/views/Admin');
			return {
				element: (
					<PrivateOutlet>
						<DashLayout />
					</PrivateOutlet>
				),
			};
		},
		children: [
			{
				index: true,
				async lazy() {
					const { default: Home } = await import('../modules/dashboard/home/views/index');
					return {
						element: (
							<PrivateOutlet>
								<Home />
							</PrivateOutlet>
						),
					};
				},
			},
			{
				path: 'categoria',
				async lazy() {
					const { default: Categoria } = await import(
						'../modules/dashboard/categorias/views/index'
					);
					return {
						element: (
							<PrivateOutlet>
								<Categoria />
							</PrivateOutlet>
						),
					};
				},
			},
			{
				path: 'foodmenu',
				async lazy() {
					const { default: Food } = await import('../modules/dashboard/food/views/index');
					return {
						element: (
							<PrivateOutlet>
								<Food />
							</PrivateOutlet>
						),
					};
				},
			},
			{
				path: 'usuario',
				async lazy() {
					const { default: Usuario } = await import('../modules/dashboard/usuario/view/index');
					return {
						element: (
							<PrivateOutlet>
								<Usuario />
							</PrivateOutlet>
						),
					};
				},
			},
			{
				path: 'cliente',
				async lazy() {
					const { default: Cliente } = await import('../modules/dashboard/cliente/views/index');
					return {
						element: (
							<PrivateOutlet>
								<Cliente />
							</PrivateOutlet>
						),
					};
				},
			},
			{
				path: 'ordenes',
				async lazy() {
					const { default: Orden } = await import('../modules/dashboard/orden/views/index');
					return {
						element: (
							<PrivateOutlet>
								<Orden />
							</PrivateOutlet>
						),
					};
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
