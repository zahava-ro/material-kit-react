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
    name: 'ABC Corp',
    notes: 'Located at 123 Main Street, City, State, Zip',
    email: 'contact@abccorp.com',
    phone: '555-123-4567',
    status: 'Active',
  },
  {
    id: 2,
    name: 'XYZ School',
    notes: 'Located at 456 Park Avenue, City, State, Zip',
    email: 'info@xyzschool.org',
    phone: '555-987-6543',
    status: 'Active',
  },
  {
    id: 3,
    name: 'City Library',
    notes: 'Located at 789 Elm Road, City, State, Zip',
    email: 'library@citylibrary.org',
    phone: '555-456-7890',
    status: 'Archived',
  },
  {
    id: 4,
    name: 'Green Gardens Inc',
    notes: 'Located at 567 Oak Lane, City, State, Zip',
    email: 'info@greengardens.com',
    phone: '555-876-5432',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Sal Industries',
    notes: 'Located at 901 Pine Street, City, State, Zip',
    email: 'contact@pestfreeindustries.com',
    phone: '555-234-5678',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Tech Solutions Ltd',
    notes: 'Located at 234 Cedar Avenue, City, State, Zip',
    email: 'info@techsolutions.com',
    phone: '555-765-4321',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Acme Corp',
    notes: 'Located at 345 Maple Drive, City, State, Zip',
    email: 'contact@acmecorp.com',
    phone: '555-678-9012',
    status: 'Archived',
  },
  {
    id: 8,
    name: 'Global Inc',
    notes: 'Located at 678 Birch Street, City, State, Zip',
    email: 'info@globalinc.com',
    phone: '555-890-1234',
    status: 'Active',
  },
  {
    id: 9,
    name: 'City Hospital',
    notes: 'Located at 789 Pine Avenue, City, State, Zip',
    email: 'info@cityhospital.org',
    phone: '555-432-5678',
    status: 'Active',
  },
  {
    id: 10,
    name: 'Golden Resorts',
    notes: 'Located at 123 Elm Road, City, State, Zip',
    email: 'info@goldenresorts.com',
    phone: '555-876-5432',
    status: 'Active',
  },
];

