import ProductCard from './product-card';
import createRandomProduct from '../mock/utils';

function CatalogCards() {
  const products = Array.from({ length: 6 }, createRandomProduct);

  return (
    <div className="catalog__cards">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default CatalogCards;
