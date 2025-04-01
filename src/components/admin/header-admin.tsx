import LogoutBtn from './logout-btn';
import SiteSelector from './site-selector';

function HeaderAdmin() {
  return (
    <header className="header">
      <div className="header__inner container">
        <div className="header__block">
          <SiteSelector />
        </div>
        <div className="header__block">
          <LogoutBtn />
        </div>
      </div>
    </header>
  );
}

export default HeaderAdmin;
