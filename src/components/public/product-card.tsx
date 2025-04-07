import MarketplaceList from './marketplace-list';
import { BaseProduct } from '../../types/public/product';

type ProductCardProps = {
  product: BaseProduct;
};

/*!TODO доделать ссылки на маркетплейсы*/

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card__img">
        <img src={product.previewImg} alt={product.name} />
      </div>
      <div className="product-card__info">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
      </div>
      <div className="product-card__marketplace">
        <MarketplaceList
          context="productCard"
          product={product}
        />
      </div>
    </div>
  );
}

export default ProductCard;
