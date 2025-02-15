import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// const employees = [...Array(24)].map((_, index) => ({
//   id: faker.datatype.uuid(),
//   avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
//   name: faker.name.fullName(),
//   // company: faker.company.name(),
//   company: 'High Rock Pest Solutions',
//   // isVerified: faker.datatype.boolean(),
//   status: sample(['Active', 'Archived']),
//   role: sample(['Worker','Manager']),
// }));

export const dummyEmployees = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    status: 'Active',
    license_id: 'EMP001',
    email: 'john.doe@example.com',
    phone_number: '555-123-4567',
    address_line1: '123 Main Street',
    address_line2: 'Apt 456',
    city: 'Cityville',
    state: 'Stateland',
    postal_code: '12345',
    notes: 'Certified pest control technician',
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    status: 'Archived',
    license_id: 'EMP002',
    email: 'jane.smith@example.com',
    phone_number: '555-987-6543',
    address_line1: '456 Park Avenue',
    address_line2: 'Suite 789',
    city: 'Townsville',
    state: 'Stateland',
    postal_code: '56789',
    notes: 'Former employee, no longer active',
  },
  {
    id: 3,
    first_name: 'Robert',
    last_name: 'Johnson',
    status: 'Active',
    license_id: 'EMP003',
    email: 'robert.johnson@example.com',
    phone_number: '555-456-7890',
    address_line1: '789 Elm Road',
    address_line2: 'Unit 101',
    city: 'Cityville',
    state: 'Stateland',
    postal_code: '12345',
    notes: 'Experienced exterminator',
  },
  {
    id: 4,
    first_name: 'Emily',
    last_name: 'Wilson',
    status: 'Active',
    license_id: 'EMP004',
    email: 'emily.wilson@example.com',
    phone_number: '555-876-5432',
    address_line1: '567 Oak Lane',
    address_line2: 'Unit 202',
    city: 'Townsville',
    state: 'Stateland',
    postal_code: '56789',
    notes: 'Friendly and reliable technician',
  },
  {
    id: 5,
    first_name: 'Michael',
    last_name: 'Lee',
    status: 'Archived',
    license_id: 'EMP005',
    email: 'michael.lee@example.com',
    phone_number: '555-234-5678',
    address_line1: '901 Pine Street',
    address_line2: 'Apt 303',
    city: 'Cityville',
    state: 'Stateland',
    postal_code: '12345',
    notes: 'Retired technician, no longer active',
  },
  {
    id: 6,
    first_name: 'Sophia',
    last_name: 'Brown',
    status: 'Active',
    license_id: 'EMP006',
    email: 'sophia.brown@example.com',
    phone_number: '555-765-4321',
    address_line1: '234 Cedar Avenue',
    address_line2: 'Suite 404',
    city: 'Townsville',
    state: 'Stateland',
    postal_code: '56789',
    notes: 'Specializes in pest identification',
  },
  // Add more dummy employees here...
];

