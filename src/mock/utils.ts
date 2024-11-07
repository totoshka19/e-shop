import { faker } from '@faker-js/faker';
import { BaseProduct } from '../types/product';

function createRandomProduct(): BaseProduct {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    previewImg: faker.image.urlLoremFlickr({ width: 490, height: 320, category: 'computer' }),
    description: faker.lorem.sentence(),
  };
}

export default createRandomProduct;
