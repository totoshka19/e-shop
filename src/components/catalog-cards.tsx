import { useState, useEffect } from 'react';
import ProductCard from './product-card';
import Pagination from './pagination';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchProducts } from '../store/products-slice';
import { PRODUCTS_PER_PAGE } from '../conts';
import { BaseProduct } from '../types/product';

function CatalogCards() {
  const dispatch = useDispatch<AppDispatch>();
  const products: BaseProduct[] = useSelector((state: RootState) => state.products.items);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(PRODUCTS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts: BaseProduct[] = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="catalog__cards">
        {currentProducts.map((product: BaseProduct) => (
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
