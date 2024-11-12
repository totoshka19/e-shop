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
              <div className="product__content">
                <div className="product__block product__block-pictures">
                  <a className="picture__link" href="">
                    <img className="picture__img" src={product.previewImg} alt={product.name} />
                  </a>
                  <a className="picture__link" href="">
                    <img className="picture__img" src={product.previewImg} alt={product.name} />
                  </a>
                  <a className="picture__link" href="">
                    <img className="picture__img" src={product.previewImg} alt={product.name} />
                  </a>
                  <a className="picture__link" href="">
                    <img className="picture__img" src={product.previewImg} alt={product.name} />
                  </a>
                  <a className="picture__link" href="">
                    <img className="picture__img" src={product.previewImg} alt={product.name} />
                  </a>
                  <a className="picture__link" href="">
                    <img className="picture__img" src={product.previewImg} alt={product.name} />
                  </a>
                </div>
                <div className="product__block product__block-info">
                  <h1 className="product__title">{product.name}</h1>
                  <div className="product__wrapper">
                    <div className="product__wrapper-item">
                      <div className="product__share">
                        <p>Актуальные цены смотрите на маркетах</p>
                        <button className="product__share-button" id="copy-link">
                          <img src="/public/images/copy-icon.svg" alt="Копировать ссылку"/>
                        </button>
                        <button className="product__share-button" id="share-popup">
                          <img src="/public/images/share-icon.svg" alt="Поделиться"/>
                        </button>
                      </div>
                      <div className="product__marketplace">
                        <ul className="marketplace__list">
                          <li className="marketplace__item">
                            <a className="marketplace__item-link" href="">
                              <img src="/images/wb-icon.svg" alt="Купить на Wildberries"/>
                              Купить - 429р
                            </a>
                          </li>
                          <li className="marketplace__item">
                            <a className="marketplace__item-link" href="">
                              <img src="/images/ozon-icon.svg" alt="Купить на Ozon"/>
                              Купить - 429р
                            </a>
                          </li>
                          <li className="marketplace__item">
                            <a className="marketplace__item-link" href="">
                              <img src="/images/yamarket-icon.svg" alt="Купить на Яндекс Маркете"/>
                              Купить - 429р
                            </a>
                          </li>
                          <li className="marketplace__item">
                            <a className="marketplace__item-link" href="">
                              <img src="/images/avito-icon.svg" alt="Купить на Avito"/>
                              Купить - 429р
                            </a>
                          </li>
                          <li className="marketplace__item">
                            <a className="marketplace__item-link" href="">
                              <img src="/images/enote-icon.svg" alt="Купить в Enote Shope"/>
                              Купить - 429р
                            </a>
                          </li>
                          <button className="order-btn">Оформить заказ</button>
                        </ul>
                      </div>
                      <button>Добавить в корзину</button>
                    </div>
                    <div className="product__wrapper-item">
                      <div className="product__description">
                        <p>{product.description}</p>
                        <p>{product.description}</p>
                        <p>{product.description}</p>
                      </div>
                      <a href="">Перейти к описанию &gt;</a>

                    </div>
                  </div>
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
