import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../components/layout';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchProduct } from '../store/product-slice';
import { BaseProduct } from '../types/product';
import Breadcrumbs from '../components/breadcrumbs';

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const product: BaseProduct | null = useSelector((state: RootState) => state.product.item);
  const loading: boolean = useSelector((state: RootState) => state.product.loading);
  const error: string | null = useSelector((state: RootState) => state.product.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>{product.name} - E-shop</title>
      </Helmet>

      <Layout>
        <main>
          <Breadcrumbs />

          <section className="product">
            <div className="container">
              <img src={product.previewImg} alt={product.name} />
              <h1>{product.name}</h1>
              <p>{product.description}</p>
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}

export default ProductPage;
