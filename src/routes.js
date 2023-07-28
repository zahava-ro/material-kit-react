import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
// pages
import BlogPage from './pages/BlogPage';
import CustomerPage from './pages/CustomerPage';
import EmployeesPage from './pages/EmployeesPage';
import ServicesPage from './pages/ServicesPage';
import ScrapPage from './pages/ScrapPage';
import CalendarPage from './pages/CalendarPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import InventoryPage from './pages/InventoryPage';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'customers', element: <CustomerPage /> },
        { path: 'inventory', element: <InventoryPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'employees', element: <EmployeesPage /> },
        { path: 'services', element: <ServicesPage /> },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'scrap', element: <ScrapPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'users', element: <UserPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}