import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSite } from '../../store/admin/site-slice';
import { AppDispatch, RootState } from '../../store/store';
import { sites } from '../../consts';

type SiteSelectorProps = {
  className: string;
};

function SiteSelector({ className }: SiteSelectorProps) {
  const dispatch = useDispatch<AppDispatch>();
  const selectedSite = useSelector((state: RootState) => state.site.selectedSite);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const currentSite = sites.find((current) => current.id === selectedId);
    if (currentSite) {
      dispatch(selectSite(currentSite));
    }
  };

  return (
    <div className={`site-selector ${className || ''}`}>
      <label htmlFor="site-selector" className="site-selector__label">
        Выберите сайт:
      </label>
      <select
        id="site-selector"
        value={selectedSite?.id || ''}
        onChange={handleChange}
        className="site-selector__select"
      >
        <option value="" disabled>
          Выбор сайта для управления
        </option>
        {sites.map((site) => (
          <option key={site.id} value={site.id}>
            {site.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SiteSelector;
