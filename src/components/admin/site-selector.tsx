import { useDispatch, useSelector } from 'react-redux';
import { selectSite } from '../../store/admin/site-slice';
import { AppDispatch, RootState } from '../../store/store';
import { sites } from '../../consts';
import SelectEntity from './select-entity';

function SiteSelector() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedSite = useSelector((state: RootState) => state.site.selectedSite);

  // Обработчик изменения значения
  const handleChange = (value: string) => {
    const foundSite = sites.find((site) => site.id === value); // Изменено имя переменной
    if (foundSite) {
      dispatch(selectSite(foundSite));
    }
  };

  return (
    <SelectEntity
      options={sites.map((site) => site.name)} // Передаем массив имен сайтов
      value={selectedSite?.name || ''} // Текущее выбранное значение
      onChange={(value) => {
        const foundSite = sites.find((site) => site.name === value); // Изменено имя переменной
        if (foundSite) {
          handleChange(foundSite.id);
        } // Преобразуем имя в id
      }}
      placeholder="Выбор сайта для управления" // Плейсхолдер
    />
  );
}

export default SiteSelector;
