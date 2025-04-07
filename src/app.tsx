import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import CatalogPage from './pages/public/catalog-page';
import ProductPage from './pages/public/product-page';
import BasketPage from './pages/public/basket-page';
import OrderPage from './pages/public/order-page';
import NotFoundPage from './pages/public/not-found-page';
import AdminPage from './pages/admin/admin-page';
import { store } from './store/store';
import { AppRoute } from './consts';

function App() {

  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter basename="/e-shop/">
          <Routes>
            <Route path={AppRoute.Catalog} element={<CatalogPage />} />
            <Route path={AppRoute.Product} element={<ProductPage />} />
            <Route path={AppRoute.Basket} element={<BasketPage />} />
            <Route path={AppRoute.Order} element={<OrderPage />} />
            <Route path={AppRoute.Admin} element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
