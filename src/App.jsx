import { Routes, Route } from 'react-router-dom';
import Product from './pages/Product';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './PrivateRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}