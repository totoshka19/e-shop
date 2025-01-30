import { fakerRU as faker } from '@faker-js/faker';
import { BaseProduct } from '../types/product';
import { Review } from '../types/review';

const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

const uniqueCategories = Array.from({ length: 10 }, () =>
  capitalize(faker.commerce.department())
);

const uniqueSubcategories = Array.from({ length: 5 }, () =>
  capitalize(faker.commerce.productAdjective())
);

function createRandomProduct(): BaseProduct {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    previewImg: faker.image.urlLoremFlickr({ width: 490, height: 320 }),
    description: faker.lorem.sentences(2),
    category: faker.helpers.arrayElement(uniqueCategories),
    subcategory: faker.helpers.arrayElement(uniqueSubcategories),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    inStock: true,
    sku: String(Math.floor(100000000 + Math.random() * 900000000)),
    images: Array.from({ length: 4 }, () =>
      faker.image.urlLoremFlickr()
    ),
  };
}

export function createMockProductsArray(): BaseProduct[] {
  const count = faker.number.int({ min: 10, max: 100 });
  const products: BaseProduct[] = [];

  for (let i = 0; i < count; i++) {
    products.push(createRandomProduct());
  }

  return products;
}

function createRandomReview(): Review {
  return {
    id: faker.string.uuid(),
    username: faker.person.firstName(),
    rating: faker.number.int({ min: 1, max: 5 }),
    date: faker.date.past().toLocaleString('ru-RU', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    review: faker.lorem.sentence(),
  };
}

function createMockReviewsArray(): Review[] {
  const count = faker.number.int({ min: 2, max: 6 });
  const reviews: Review[] = [];

  for (let i = 0; i < count; i++) {
    reviews.push(createRandomReview());
  }

  return reviews;
}

export function initializeMockData() {
  const storedProducts = localStorage.getItem('mockProducts');
  const storedReviews = localStorage.getItem('mockReviews');

  if (!storedProducts) {
    const products = createMockProductsArray();
    localStorage.setItem('mockProducts', JSON.stringify(products));
  }

  if (!storedReviews) {
    const reviews = createMockReviewsArray();
    localStorage.setItem('mockReviews', JSON.stringify(reviews));
  }
}
