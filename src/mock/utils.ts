import { fakerRU as faker } from '@faker-js/faker';
import { BaseProduct } from '../types/product';

function createRandomProduct(): BaseProduct {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    previewImg: faker.image.urlLoremFlickr({ width: 490, height: 320, category: 'computer' }),
    description: faker.lorem.sentences(2),
    category: faker.commerce.department(),
    subcategory: faker.commerce.productAdjective(),
  };
}

export function createMockProductsArray(): BaseProduct[] {
  const count = faker.number.int({ min: 30, max:  100});
  const products: BaseProduct[] = [];

  for (let i = 0; i < count; i++) {
    products.push(createRandomProduct());
  }

  return products;
}
