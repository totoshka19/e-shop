import React, { useState } from 'react';
import { marketplaceIcons } from '../conts';

type MarketplaceItemProps = {
  name: string;
  price: number;
  link: string;
};

function MarketplaceItem({ name, price, link }: MarketplaceItemProps) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const formattedPrice = price ? `${Math.round(price)}р` : 'Цена не указана';

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <li className="marketplace-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img src={marketplaceIcons[name]} alt={`Купить на ${name}`} />
      {isTooltipVisible && (
        <div className="tooltip">
          <p>{formattedPrice}</p>
          <a href={link} target="_blank" rel="noopener noreferrer">Перейти</a>
        </div>
      )}
    </li>
  );
}

export default MarketplaceItem;
