import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../components/layout';
import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../conts';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchProduct } from '../store/product-slice';
import { BaseProduct } from '../types/product';

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
          <section className="product">
            <div className="container">
              <div className="breadcrumbs">
                <div className="container">
                  <ul className="breadcrumbs__list">
                    <li className="breadcrumbs__item">
                      <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Главная
                        <svg width="5" height="8" aria-hidden="true">
                          <use xlinkHref="#icon-arrow-mini"></use>
                        </svg>
                      </Link>
                    </li>
                    <li className="breadcrumbs__item">
                      <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Электроника
                        <svg width="5" height="8" aria-hidden="true">
                          <use xlinkHref="#icon-arrow-mini"></use>
                        </svg>
                      </Link>
                    </li>
                    <li className="breadcrumbs__item">
                      <span className="breadcrumbs__link breadcrumbs__link--active">Комплектующие</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="product">
                <div className="container">
                  <img src={product.previewImg} alt={product.name} />
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}

export default ProductPage;
