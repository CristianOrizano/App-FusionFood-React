import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import routers from './routers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosInterceptor } from './core/interceptors';
import CarProvider from './modules/dashboard/food/infraestrcuture/context/CarProvider.js';

//import './layouts/views/templates/js/app.js';
import { ToastContainer } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';
//import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './layouts/views/templates/scss/app.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Importa los estilos para el efecto de desenfoque
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import 'bootstrap';
AxiosInterceptor();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<CarProvider>
				<RouterProvider router={routers} />
				<ToastContainer />
				<ReactQueryDevtools initialIsOpen={false} />
			</CarProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
