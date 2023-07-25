import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const customers = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.company.name(),
  // company: 'High Rock Pest Solutions',
  // isVerified: faker.datatype.boolean(),
  status: sample(['Active', 'Archived']),
  role: sample(['Building Manager','Owner']),
}));

export const dummyCustomers = [
  {
    id: 1,
    name: 'John Doe',
    address: '123 Main Street, City, State, Zip',
    email: 'john.doe@example.com',
    phone: '555-123-4567',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    address: '456 Park Avenue, City, State, Zip',
    email: 'jane.smith@example.com',
    phone: '555-987-6543',
    status: 'Archived'
  },
];

export default customers;