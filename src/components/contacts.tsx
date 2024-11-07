function Contacts() {
  return (
    <ul className="header__contacts contacts" aria-label="Контакты">
      <li className="contacts__item">
        <a href="tel:84993502608" aria-label="Телефон: 8-499-350-26-08">8-499-350-26-08</a>
      </li>
      <li className="contacts__item">
        <a href="mailto:info@enote-shop.ru" aria-label="Электронная почта: info@enote-shop.ru">info@enote-shop.ru</a>
      </li>
    </ul>
  );
}

export default Contacts;
