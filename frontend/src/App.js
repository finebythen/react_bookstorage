import './App.css';
import Layout from './components/Layout';
import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';

const App = () => {
	return(
		<AuthProvider>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route element={<PrivateRoute />}>
					<Route path="/" element={<Layout />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Route>

				{/* <Route path="/" element={<Layout />}>

					<Route path="*" element={<Navigate to="/" replace />} />
				</Route> */}
			</Routes>
		</AuthProvider>
	)
};

export default App;