import LogoutBtn from './logout-btn';
import SiteSelector from './site-selector';


function HeaderAdmin() {
  return (
    <header className="header-admin">
      <div className="header-admin__inner container">
        <SiteSelector className="header-admin__site-selector" />
        <LogoutBtn className="header-admin__logout-btn" />
      </div>
    </header>
  );
}

export default HeaderAdmin;
