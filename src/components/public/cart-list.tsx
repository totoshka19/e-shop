import { BaseProduct } from '../../types/public/product';
import CartItem from './cart-item';

type CartListProps = {
  items: { product: BaseProduct; quantity: number }[];
  isInStock: boolean;
}

function CartList({ items, isInStock }: CartListProps) {
  const itemClass = isInStock ? 'cart__items' : 'cart-out-of-stock__items';

  return (
    <div className={itemClass}>
      {items.map(({ product, quantity }) => (
        <CartItem key={product.id} item={product} quantity={quantity} />
      ))}
    </div>
  );
}

export default CartList;
