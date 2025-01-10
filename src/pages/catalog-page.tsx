import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../components/layout';
import CatalogCards from '../components/catalog-cards';
import ReturnBtn from '../components/return-btn';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function CatalogPage() {
  const { isDropdownOpen, isCatalogBtnInFooter } = useSelector((state: RootState) => state.catalog);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 720);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isReturnBtnVisible = isMobile && isCatalogBtnInFooter && isDropdownOpen;

  return (
    <div className="wrapper">
      <Helmet>
        <title>E-shop</title>
      </Helmet>

      <Layout>
        <main>
          {isReturnBtnVisible && <ReturnBtn isVisible />}
          <section className="banner">
            <div className="container">
              <div className="banner__inner">
                <h1 className="banner__title">Мы&nbsp;на&nbsp;маркетах</h1>
                <h2 className="banner__subtitle">Наши товары для Вас на&nbsp;любой удобной площадке</h2>
              </div>
            </div>
          </section>
          <section className="catalog">
            <div className="container">
              <CatalogCards />
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}

export default CatalogPage;
