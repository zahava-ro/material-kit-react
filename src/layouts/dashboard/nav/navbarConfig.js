// component
import SvgColor from '../../../components/svg-color';

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
    title: 'Materials',
    path: '/dashboard/materials',
    icon: icon('ic_cart'),
  },
  {
    title: 'Calendar',
    path: '/dashboard/appointments',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'Scrap Page',
  //   path: '/dashboard/scrap',
  //   icon: icon('ic_blog'),
  // },
  
  // extra pages that came with the template
  // {
  //   title: 'Products (from template)',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'Blog (from template)',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'Users (from template)',
  //   path: '/dashboard/users',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'login (from template)',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found (from template)',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;