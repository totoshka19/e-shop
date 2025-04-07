import React from 'react';

type CharacteristicsProps = {
  style?: React.CSSProperties;
}

function Characteristics({ style }: CharacteristicsProps) {
  return (
    <section className="characteristics" style={style}>
      <div className="container">
        <div className="characteristics__wrapper">
          <h2 className="characteristics__title">Характеристики</h2>
          <a className="characteristics__link" href="src/components/public/characteristics">Перейти к характеристикам &gt;</a>
        </div>
        <div className="characteristics__block">
          <h3 className="characteristics__block-title">Основные</h3>
          <div className="characteristics__block-wrapper">
            <div className="product__table">
              <table className="table">
                <tbody>
                  <tr className="table__row">
                    <td className="table__parameter">Артикул</td>
                    <td className="table__meaning">163443548</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__parameter">Тип</td>
                    <td className="table__meaning">Корпус для ssd</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__parameter">Страна производитель</td>
                    <td className="table__meaning">Китай</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__parameter">Материал</td>
                    <td className="table__meaning">Пластик</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="product__table">
              <table className="table">
                <tbody>
                  <tr className="table__row">
                    <td className="table__parameter">Артикул</td>
                    <td className="table__meaning">163443548</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__parameter">Тип</td>
                    <td className="table__meaning">Корпус для ssd</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__parameter">Материал</td>
                    <td className="table__meaning">Пластик</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="characteristics__block">
          <h3 className="characteristics__block-title">Дополнительная информация</h3>
          <div className="characteristics__block-wrapper">
            <div className="product__table">
              <table className="table">
                <tbody>
                  <tr className="table__row">
                    <td className="table__parameter">Артикул</td>
                    <td className="table__meaning">163443548</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__parameter">Тип</td>
                    <td className="table__meaning">Корпус для ssd</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__parameter">Материал</td>
                    <td className="table__meaning">Пластик</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="product__table">
              <table className="table">
                <tbody>
                  <tr className="table__row">
                    <td className="table__parameter">Артикул</td>
                    <td className="table__meaning">163443548</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__parameter">Тип</td>
                    <td className="table__meaning">Корпус для ssd</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__parameter">Страна производитель</td>
                    <td className="table__meaning">Китай</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__parameter">Материал</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__parameter">Артикул</td>
                    <td className="table__meaning">163443548</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Characteristics;
