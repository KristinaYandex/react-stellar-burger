import React from "react";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import feedOrderStyle from "./feed-order.module.css";
import { useSelector } from "react-redux";
import { getIngredients } from "../../services/selectors/burger-ingredients";

function FeedOrder({order}) {

    const burgerIngredients = useSelector(getIngredients); /*Ингредиенты бургера*/ 

    function idIngredient(ingredient) {
      return burgerIngredients.find((item) => item._id === ingredient); /*Id ингредиента*/
    }

    const idIngredients = order.ingredients.map((item) => idIngredient(item)); /*Массив всех ингредиентов в заказе по Id*/

    const totalSum = React.useMemo(() => {
      return idIngredients.reduce((price, item) => {
        return (
          price +
          (item.type === "bun" ? item.price * 2 : 0) +
          (item.type !== "bun" ? item.price : 0)
        );
      }, 0);
    }, [idIngredients]);

    /*Дата и время заказа*/
    const dateFromServer = order.createdAt;    

    return (
      <div className={feedOrderStyle.container}>
        <div className={feedOrderStyle.order}>
          <div className={feedOrderStyle.numberAndDate}>
            <p className={`text text_type_digits-default ${feedOrderStyle.number}`}>{order.number}</p>
            <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(dateFromServer)} />
          </div>
          <h3 className={`text text_type_main-medium ${feedOrderStyle.heading}`}>{order.name}</h3>
          <div className={feedOrderStyle.details}>
            <ul className={feedOrderStyle.list}>
              {idIngredients.map((ingredient, index) => {
                if (index > 5) {
                  return null
                } else if (index <= 5) {
                  return (
                    <li key={index} className={feedOrderStyle.image}>
                      <img
                        src={ingredient.image_mobile}
                        alt="Изображение ингредиента"
                      />
                    </li>
                  );
                }
              })}
              {idIngredients.length > 6 ? (
                <p className={`text text_type_digits-default ${feedOrderStyle.count}`}>+{idIngredients.length - 6}</p>
              ) : null}
            </ul>
            <div className={feedOrderStyle.cost}>
              <p className={`text text_type_digits-medium ${feedOrderStyle.number}`}>{totalSum ? totalSum : 0}</p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FeedOrder;