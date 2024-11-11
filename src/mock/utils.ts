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

function createMockProductsArray(): BaseProduct[] {
  const count = faker.number.int({ min: 10, max:  100});
  const products: BaseProduct[] = [];

  for (let i = 0; i < count; i++) {
    products.push(createRandomProduct());
  }

  return products;
}

export function initializeMockData() {
  const storedProducts = localStorage.getItem('mockProducts');
  if (!storedProducts) {
    const products = createMockProductsArray();
    localStorage.setItem('mockProducts', JSON.stringify(products));
  }
}
