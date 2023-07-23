import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  "Boric acid",
  "Pyrethroids",
  "Fipronil",
  "Imidacloprid",
  "Chlorpyrifos",
  "Deltamethrin",
  "Permethrin",
  "Diatomaceous earth",
  "Glue traps",
  "Insect growth regulators (IGRs)",
  "Rodenticides",
  "Nematodes",
  "Botanical insecticides",
  "UV light traps",
  "Electronic rodent repellents",
  "Fumigants",
  "Termite bait systems",
  "Pheromone traps",
  "Repellents with DEET",
  "Sulfuryl fluoride",
  "Neonicotinoids",
  "Microbial insecticides",
  "Repellents with picaridin",
];
const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];

// ----------------------------------------------------------------------

const products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `/assets/images/products/product_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['sale', 'out of stock', '', '']),
  };
});

export default products;
