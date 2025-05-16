import { Category } from '../../types/public/product';
import SelectEntity from './select-entity';

type CategorySelectorProps = {
  categories: Category[];
  selectedGroup: number | null;
  selectedSubgroup: number | null;
  onGroupChange: (value: string) => void;
  onSubgroupChange: (value: string) => void;
  validationError?: boolean;
  styles: { [key: string]: string };
}

function CategorySelector({
  categories,
  selectedGroup,
  selectedSubgroup,
  onGroupChange,
  onSubgroupChange,
  validationError,
  styles,
}: CategorySelectorProps): JSX.Element {
  const selectedGroupObject = categories.find((g) => g.id === selectedGroup);
  const subcategoryOptions = selectedGroupObject?.child?.map((subgroup: Category) => subgroup.name) || [];
  const selectedSubgroupName = selectedGroupObject?.child?.find(
    (subgroup: Category) => subgroup.id === selectedSubgroup
  )?.name || '';

  return (
    <>
      <div className={styles.field}>
        <label>Группа {validationError && <span style={{ color: 'red' }}>*</span>}</label>
        <SelectEntity
          options={categories.map((group: Category) => group.name)}
          value={selectedGroupObject?.name || ''}
          onChange={onGroupChange}
          placeholder="Выберите группу"
          className={validationError ? styles.error : ''}
        />
      </div>

      {selectedGroup && subcategoryOptions.length > 0 && (
        <div className={styles.field}>
          <label>Подгруппа</label>
          <SelectEntity
            options={subcategoryOptions}
            value={selectedSubgroupName}
            onChange={onSubgroupChange}
            placeholder="Выберите подгруппу"
          />
        </div>
      )}
    </>
  );
}

export default CategorySelector;
