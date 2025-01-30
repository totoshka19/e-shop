import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import CatalogPage from './pages/catalog-page';
import ProductPage from './pages/product-page';
import BasketPage from './pages/basket-page';
import OrderPage from './pages/order-page';
import NotFoundPage from './pages/not-found-page';
import { store } from './store/store';
import { AppRoute } from './conts';

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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
