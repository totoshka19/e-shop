import React, { useState, useEffect } from 'react';
import ProductCard from './product-card';
import Pagination from './pagination';
import { createMockProductsArray } from '../mock/utils';
import { BaseProduct } from '../types/product';
import { PRODUCTS_PER_PAGE } from '../conts';

function CatalogCards() {
  const [products, setProducts] = useState<BaseProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(PRODUCTS_PER_PAGE);

  useEffect(() => {
    const mockProducts = createMockProductsArray();
    setProducts(mockProducts);
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="catalog__cards">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(products.length / productsPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
}


export default CatalogCards;
