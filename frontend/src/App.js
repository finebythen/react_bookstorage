import './App.css';
import Layout from './components/Layout';
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';
import AuthorsList from './features/authors/AuthorsList';
import BooksList from './features/books/BooksList';
import BooksCreate from './features/books/BooksCreate';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';

const App = () => {
	return(
		<AuthProvider>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route element={<PrivateRoute />}>
					<Route path="/" element={<Layout />}>
						<Route path="/author" element={<AuthorsList />} />
						<Route path="/book" element={<BooksList />} />
						<Route path="/book/create" element={<BooksCreate />} />
					</Route>

					{/* Catch all - could be replaced with 404 if wanted */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Route>
			</Routes>
		</AuthProvider>
	)
};

export default App;