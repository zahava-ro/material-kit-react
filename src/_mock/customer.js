import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

// export default const customers = [...Array(24)].map((_, index) => ({
//   id: faker.datatype.uuid(),
//   avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
//   name: faker.name.fullName(),
//   company: faker.company.name(),
//   // company: 'High Rock Pest Solutions',
//   // isVerified: faker.datatype.boolean(),
//   status: sample(['Active', 'Archived']),
//   role: sample(['Building Manager','Owner']),
// }));

export const dummyCustomers = [
  {
    id: 1,
    name: 'John Doe',
    notes: '123 Main Street, City, State, Zip',
    email: 'john.doe@example.com',
    phone: '555-123-4567',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    notes: '456 Park Avenue, City, State, Zip',
    email: 'jane.smith@example.com',
    phone: '555-987-6543',
    status: 'Archived',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    notes: '789 Elm Road, City, State, Zip',
    email: 'robert.johnson@example.com',
    phone: '555-456-7890',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Emily Wilson',
    notes: '567 Oak Lane, City, State, Zip',
    email: 'emily.wilson@example.com',
    phone: '555-876-5432',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Michael Lee',
    notes: '901 Pine Street, City, State, Zip',
    email: 'michael.lee@example.com',
    phone: '555-234-5678',
    status: 'Archived',
  },
  {
    id: 6,
    name: 'Sophia Brown',
    notes: '234 Cedar Avenue, City, State, Zip',
    email: 'sophia.brown@example.com',
    phone: '555-765-4321',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Daniel Miller',
    notes: '345 Maple Drive, City, State, Zip',
    email: 'daniel.miller@example.com',
    phone: '555-678-9012',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Olivia Davis',
    notes: '678 Birch Street, City, State, Zip',
    email: 'olivia.davis@example.com',
    phone: '555-890-1234',
    status: 'Archived',
  },
  {
    id: 9,
    name: 'James Taylor',
    notes: '789 Pine Avenue, City, State, Zip',
    email: 'james.taylor@example.com',
    phone: '555-432-5678',
    status: 'Active',
  },
  {
    id: 10,
    name: 'Ava Johnson',
    notes: '123 Elm Road, City, State, Zip',
    email: 'ava.johnson@example.com',
    phone: '555-876-5432',
    status: 'Active',
  },
];
