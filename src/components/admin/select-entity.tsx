import styles from '../../styles/admin/select-entity.module.scss';

type SelectEntityProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

function SelectEntity({
  options,
  value,
  onChange,
  placeholder,
}: SelectEntityProps) {
  return (
    <div className={styles['select-entity']}>
      <select
        id="select-entity"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles['select-entity__select']}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option} value={option} className={styles['select-entity__option']}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectEntity;
