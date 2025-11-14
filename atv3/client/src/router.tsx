import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import StorePage from './pages/StorePage';
import AdminPage from './pages/AdminPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <StorePage />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
      },
    ],
  },
]);
