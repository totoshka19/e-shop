import { useDispatch, useSelector } from 'react-redux';
import { selectSite } from '../../store/admin/site-slice';
import { AppDispatch, RootState } from '../../store/store';
import { sites } from '../../consts';
import SelectEntity from './select-entity';

function SiteSelector() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedSite = useSelector((state: RootState) => state.site.selectedSite);

  const handleChange = (value: string) => {
    const foundSite = sites.find((site) => site.id === value);
    if (foundSite) {
      dispatch(selectSite(foundSite));
    }
  };

  return (
    <SelectEntity
      options={sites.map((site) => site.name)}
      value={selectedSite?.name || ''}
      onChange={(value) => {
        const foundSite = sites.find((site) => site.name === value);
        if (foundSite) {
          handleChange(foundSite.id);
        }
      }}
      placeholder="Выбор сайта для управления"
    />
  );
}

export default SiteSelector;
