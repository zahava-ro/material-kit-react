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

export default customers;