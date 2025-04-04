import LogoutBtn from './logout-btn';
import SiteSelector from './site-selector';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function HeaderAdmin() {
  const email = useSelector((state: RootState) => state.auth.email);
  return (
    <header className="header">
      <div className="header__inner container">
        <div className="header__block">
          <SiteSelector />
        </div>
        <div className="header__block">
          <p>{email}</p>
          <LogoutBtn />
        </div>
      </div>
    </header>
  );
}

export default HeaderAdmin;
