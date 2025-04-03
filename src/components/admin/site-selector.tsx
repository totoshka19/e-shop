import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSite } from '../../store/admin/site-slice';
import { AppDispatch, RootState } from '../../store/store';
import { sites } from '../../consts';
import styles from '../../styles/admin/site-selector.module.scss';

function SiteSelector() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedSite = useSelector((state: RootState) => state.site.selectedSite);

  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const currentSite = sites.find((current) => current.id === selectedId);
    if (currentSite) {
      dispatch(selectSite(currentSite));
    }
  };

  const handleFocus = () => {
    setShowPlaceholder(false);
  };

  const handleBlur = () => {
    if (!selectedSite) {
      setShowPlaceholder(true);
    }
  };

  return (
    <select
      id="site-selector"
      value={selectedSite?.id || ''}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={styles['site-selector']}
    >
      {showPlaceholder && (
        <option value="" disabled className={styles['site-selector__option']}>
          Выбор сайта для управления
        </option>
      )}
      {sites.map((site) => (
        <option
          key={site.id}
          value={site.id}
          className={styles['site-selector__option']}
        >
          {site.name}
        </option>
      ))}
    </select>
  );
}

export default SiteSelector;
