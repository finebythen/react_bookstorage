import './App.css';
import Layout from './components/Layout';
import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";

const App = () => {
	return(
		<Routes>
			<Route path="/" element={<Layout />}>

				<Route path="*" element={<Navigate to="/" replace />} />
			</Route>
		</Routes>
	)
};

export default App;