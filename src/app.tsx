import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/catalog-page';
import BasketPage from './pages/basket-page';
import { AppRoute } from './conts';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Catalog} element={<CatalogPage />} />
          <Route path={AppRoute.Basket} element={<BasketPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
