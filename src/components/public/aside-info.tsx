type AsideInfoProps = {
  classPrefix: string;
};

{/*!TODO добавить ссылки в элементы списка*/}
function AsideInfo({ classPrefix }: AsideInfoProps) {
  return (
    <aside className={`${classPrefix}__info`}>
      <h2 className={`${classPrefix}__info-title`}>Информация для ознакомления</h2>
      <ul className={`${classPrefix}__info-list`}>
        <li className={`${classPrefix}__info-item`}>Как оформить заказ?</li>
        <li className={`${classPrefix}__info-item`}>Как вернуть товар?</li>
        <li className={`${classPrefix}__info-item`}>Как отменить заказ?</li>
        <li className={`${classPrefix}__info-item`}>Пояснительная бригада?</li>
      </ul>
    </aside>
  );
}

export default AsideInfo;
