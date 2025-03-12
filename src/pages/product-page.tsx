import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../components/layout';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../store/product-slice';
import Breadcrumbs from '../components/breadcrumbs';
import MarketplaceList from '../components/marketplace-list';
import Reviews from '../components/reviews';
import { AppDispatch, RootState } from '../store/store';
import ReturnBtn from '../components/return-btn';
import Characteristics from '../components/characteristics';
import { addToCart } from '../store/cart-slice';
import { AppRoute } from '../consts';

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.product.item);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);

  const handleMoreClick = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
    setIsMoreButtonVisible(false);
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity: 1 }));
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Товар не найден</div>;
  }

  const breadcrumbs = [
    { name: 'Главная', path: AppRoute.Catalog },
    { name: product.category, path: `${AppRoute.Catalog}/${product.category.toLowerCase()}` },
    { name: product.subcategory, path: `${AppRoute.Catalog}/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}` },
  ];

  return (
    <div className="wrapper">
      <Helmet>
        <title>{product.name} - E-shop</title>
      </Helmet>

      <Layout>
        <main>
          <ReturnBtn isVisible />
          <Breadcrumbs crumbs={breadcrumbs} />

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

                  {/*!TODO доделать чтобы картинки разные были у товара*/}
                  {/*{product.images.map((image) => (*/}
                  {/*  <a key={image} className="picture__link" href="">*/}
                  {/*    <img className="picture__img" src={image} alt={`${product.name}`} />*/}
                  {/*  </a>*/}
                  {/*))}*/}

                  <div className="product__pagination">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        className={`product__pagination-dot ${index === 0 ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="product__block product__block-info">
                  <div className="product__title-wrapper">
                    <h1 className="product__title">{product.name}</h1>
                    {isMoreButtonVisible && (
                      <button className="product__more-link" onClick={handleMoreClick}>
                        Еще
                      </button>
                    )}
                  </div>

                  <div
                    className="product__description"
                    style={{ display: isDescriptionVisible ? 'block' : 'none' }}
                  >
                    <p>{product.description}</p>
                  </div>

                  <Characteristics style={{ display: isDescriptionVisible ? 'block' : 'none' }} />

                  <div className="product__wrapper">
                    <div className="product__wrapper-item">
                      <div className="product__share">
                        <p>Актуальные цены смотрите на маркетах</p>
                        <button className="product__share-button" id="copy-link">
                          <img src="/images/copy-icon.svg" alt="Копировать ссылку"/>
                        </button>
                        <button className="product__share-button" id="share-popup">
                          <img src="/images/share-icon.svg" alt="Поделиться"/>
                        </button>
                      </div>
                      <div className="product__marketplace">
                        <MarketplaceList
                          context="productPage"
                          product={product}
                        />
                      </div>
                      <button className="product__add-to-cart" onClick={handleAddToCart}>Добавить в корзину</button>
                    </div>
                    <div className="product__wrapper-item">
                      <div className="product__description">
                        <p>{product.description}</p>
                      </div>
                      <a className="product__description-link" href="">Перейти к описанию &gt;</a>
                    </div>
                  </div>
                  <div className="product__about">
                    <h2 className="product__about-title">О товаре</h2>
                    <div className="product__table">
                      <table className="table">
                        <tbody>
                          <tr className="table__row">
                            <td className="table__parameter">Артикул</td>
                            <td className="table__meaning">163443548</td>
                          </tr>
                          <tr className="table__row">
                            <td className="table__parameter">Тип</td>
                            <td className="table__meaning">Корпус для ssd</td>
                          </tr>
                          <tr className="table__row">
                            <td className="table__parameter">Материал</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Characteristics />

          <Reviews />
        </main>
      </Layout>
    </div>
  );
}

export default ProductPage;
