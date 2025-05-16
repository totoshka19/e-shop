import { Attribute } from '../../types/admin/state-admin';

type AttributesSectionProps = {
  attributes: Attribute[];
  onAttributeChange: (
    index: number,
    field: 'title' | 'values',
    key?: string,
    value?: string
  ) => void;
  onAddAttributeGroup: () => void;
  onRemoveAttributeGroup: (index: number) => void;
  styles: { [key: string]: string };
}

function AttributesSection({
  attributes,
  onAttributeChange,
  onAddAttributeGroup,
  onRemoveAttributeGroup,
  styles,
}: AttributesSectionProps): JSX.Element {
  return (
    <>
      {attributes.length > 0 && <h4>Атрибуты товара</h4>}
      {attributes.map((group: Attribute, index: number) => (
        <div key={group.title || JSON.stringify(group.values) + String(index)} className={styles.attributeGroup}>
          <div className={styles.field}>
            <label>Заголовок группы атрибутов</label>
            <input
              type="text"
              value={group.title}
              onChange={(e) =>
                onAttributeChange(index, 'title', undefined, e.target.value)}
              placeholder="Например: Характеристики"
            />
          </div>
          <div className={styles.values}>
            {Object.entries(group.values).map(([key, value]: [string, string]) => (
              <div key={key} className={styles.attributePair}>
                <input
                  type="text"
                  value={key}
                  placeholder="Название атрибута"
                  readOnly
                />
                <input
                  type="text"
                  value={value}
                  placeholder="Значение"
                  onChange={(e) => onAttributeChange(index, 'values', key, e.target.value)}
                />
              </div>
            ))}
          </div>
          <button type="button" onClick={() => onRemoveAttributeGroup(index)}>
            Удалить группу
          </button>
        </div>
      ))}
      <button type="button" onClick={onAddAttributeGroup} className={styles.addFieldBtn}>
        Добавить группу атрибутов
      </button>
    </>
  );
}

export default AttributesSection;
