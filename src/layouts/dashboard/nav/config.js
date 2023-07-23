// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Customers',
    path: '/dashboard/customers',
    icon: icon('ic_user'),
  },
  {
    title: 'Employees',
    path: '/dashboard/employees',
    icon: icon('ic_user'),
  },
  {
    title: 'Services',
    path: '/dashboard/services',
    icon: icon('ic_cart'),
  },
  {
    title: 'Inventory',
    path: '/dashboard/inventory',
    icon: icon('ic_cart'),
  },
  {
    title: 'Products',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Calendar',
    path: '/dashboard/calendar',
    icon: icon('ic_blog'),
  },
  {
    title: 'Scrap',
    path: '/dashboard/scrap',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
