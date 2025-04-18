import Logo from './logo';
import Contacts from './contacts';
import CatalogBtn from './catalog-btn';
import CartBtn from './cart-btn';
import { AppRoute } from '../../consts';
import { Link } from 'react-router-dom';

type FooterProps = {
  currentYear: number;
};

function Footer({ currentYear }: FooterProps) {

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__block footer__block-content">
          <div className="footer__block-inner">
            <Logo className="footer__logo" />
            <nav className="footer__nav">
              <div className="footer__nav-column">
                <h4 className="footer__nav-title">Главная</h4>
                <ul className="footer__nav-list">
                  <li className="footer__nav-item">
                    <a className="footer__nav-link" href="src/components/public/footer">О нас</a>
                  </li>
                </ul>
              </div>
              <div className="footer__nav-column">
                <h4 className="footer__nav-title">Покупателям</h4>
                <ul className="footer__nav-list">
                  <li className="footer__nav-item">
                    <a className="footer__nav-link" href="src/components/public/footer">Помощь</a>
                  </li>
                </ul>
              </div>
              <div className="footer__nav-column">
                <h4 className="footer__nav-title">Продавцам и партнёрам</h4>
                <ul className="footer__nav-list">
                  <li className="footer__nav-item">
                    <a className="footer__nav-link" href="src/components/public/footer">Часто задаваемые вопросы</a>
                  </li>
                  <li className="footer__nav-item">
                    <a className="footer__nav-link" href="src/components/public/footer">Помощь</a>
                  </li>
                </ul>
              </div>
              <div className="footer__nav-column">
                <Link to={AppRoute.Admin} className="footer__nav-link">
                  Вход в личный кабинет
                </Link>
              </div>
            </nav>
          </div>
          <div className="footer__block-inner">
            <div className="footer__social">
              <a className="footer__social-link" href="src/components/public/footer">
                <img src="/images/telegram-icon.svg" alt="Переход в Telegram"/>
              </a>
              <a className="footer__social-link" href="src/components/public/footer">
                <img src="/images/ok-icon.svg" alt="Переход в Одноклассники"/>
              </a>
              <a className="footer__social-link" href="src/components/public/footer">
                <img src="/images/whatsapp-icon.svg" alt="Переход в WhatsApp"/>
              </a>
              <a className="footer__social-link" href="src/components/public/footer">
                <img src="/images/vk-icon.svg" alt="Переход в VK"/>
              </a>
            </div>
            <Contacts className="footer__contacts" />
          </div>
        </div>
        <div className="footer__block footer__block-copyrights">
          <p>
            &copy;&nbsp;2002&ndash;{currentYear} Компания БЛА БЛА. Администрация Сайта не&nbsp;несет ответственности за&nbsp;размещаемые Пользователями материалы (в&nbsp;т.ч. информацию и&nbsp;изображения), их&nbsp;содержание и&nbsp;качество.
          </p>
        </div>
        <div className="footer__block footer__mobile-nav">
          <Link to={AppRoute.Catalog} className="home-btn" aria-label="Вернуться на главную страницу">
            <img className="cart__img" src="/images/home-icon.svg" alt="Иконка домика" width="30" height="25" />
          </Link>
          <CatalogBtn isFooter />
          <CartBtn />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
