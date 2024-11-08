import React, { useState, useEffect } from 'react';
import ProductCard from './product-card';
import { createMockProductsArray } from '../mock/utils';
import Pagination from './pagination';
import { BaseProduct } from '../types/product';
import {PRODUCTS_PER_PAGE} from '../conts';

function CatalogCards() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<BaseProduct[]>([]);

  useEffect(() => {
    const mockProducts = createMockProductsArray();
    setProducts(mockProducts);
  }, []);

  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="catalog__cards">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length > PRODUCTS_PER_PAGE && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </>
  );
}

export default CatalogCards;
