import Navbar from './components/Navbar';
import Siderbar from './components/Siderbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Admin = () => {
	return (
		<>
			<div className="wrapper">
				<Siderbar />
				<div className="main">
					<Navbar />
					<main className="content">
						<Container fluid>
							<Outlet />
						</Container>
					</main>
					<Footer />
				</div>
			</div>
		</>
	);
};

export default Admin;
