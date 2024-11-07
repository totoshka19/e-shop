import { BaseProduct } from '../types/product';

type ProductCardProps = {
  product: BaseProduct;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card__img">
        <img src={product.previewImg} alt={product.name} />
      </div>
      <div className="product-card__info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
      <div className="product-card__buttons">
      </div>
    </div>
  );
}

export default ProductCard;
