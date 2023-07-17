import React from "react";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import feedOrderStyle from "./feed-order.css";
import { useSelector } from "react-redux";
import { getIngredients } from "../../services/selectors/burger-ingredients";

function FeedOrder({order}) {

    const burgerIngredients = useSelector(getIngredients); /*Ингредиенты бургера*/ 

    function idIngredient(ingredient) {
      return burgerIngredients.find((item) => item._id === ingredient); /*Id ингредиента*/
    }

    const idIngredients = order.ingredients.map((item) => idIngredient(item)); /*Массив всех ингредиентов в заказе по Id*/

    const Tabs = {
      bun: "bun"
    }
    
    const buns = idIngredients.filter((item) => item.type === Tabs.bun); /*Булки*/ 
    const mainAndSauces = idIngredients.filter((item) => item.type !== Tabs.main); /*Соусы и начинки*/ 

    /*Дата и время заказа*/
    const dateFromServer = order.createdAt;

    /*Расчёт стоимости*/ 
    const totalSum = React.useMemo(() => mainAndSauces.reduce(
      (price, item) => (price += item.price),
      buns ? buns.price*2 : 0),
      [buns, mainAndSauces]);

    return (
      <div className={feedOrderStyle.container}>
        <div className={feedOrderStyle.numberAndDate}>
          <p className="text text_type_digits-default text_color_inactive">{order.number}</p>
          <FormattedDate date={new Date(dateFromServer)} />
        </div>
        <h3 className="text text_type_main-medium">{order.name}</h3>
        <ul className={feedOrderStyle.list}>
          {idIngredients.map((ingredient) => {
            return (
              <li key={ingredient.id} className={feedOrderStyle.mainSauce}>
                <img
                  src={ingredient.image_mobile}
                  alt="Изображение ингредиента"
                />
              </li>
            );
          })}
          {idIngredients.length >= 6 ? (
            <p className="text text_type_digits-default">+{idIngredients.length - 6}</p>
          ) : null}
        </ul>
      </div>
    );
}

export default FeedOrder;