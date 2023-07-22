import React from "react";
<<<<<<< HEAD
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import feedOrderStyle from "./feed-order.module.css";
import { useSelector } from "react-redux";
import { getIngredients } from "../../services/selectors/burger-ingredients";
import { useRouteMatch } from "react-router-dom";

function FeedOrder({order}) {
=======
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import feedOrderStyle from "./feed-order.css";
import { useSelector } from "react-redux";
import { getIngredients } from "../../services/selectors/burger-ingredients";

function FeedOrder({order}) {

>>>>>>> 6a42ab79d79aa1b014865e0c12d214d22067bbf7
    const burgerIngredients = useSelector(getIngredients); /*Ингредиенты бургера*/ 

    function idIngredient(ingredient) {
      return burgerIngredients.find((item) => item._id === ingredient); /*Id ингредиента*/
    }

<<<<<<< HEAD
    const idIngredients = order.ingredients.map((item) => idIngredient(item)).filter(Boolean); /*Массив всех ингредиентов в заказе по Id*/

    const profileFeedLink = useRouteMatch("/profile/orders");
    
    const totalSum = React.useMemo(() => {
      return idIngredients?.reduce((price, item) => {
        return (
          price + item.price
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
          <div className={feedOrderStyle.text}>
            <h3 className={`text text_type_main-medium ${feedOrderStyle.heading}`}>{order.name}</h3>
            {profileFeedLink ? (
              <p className={`text text_type_main-default ${feedOrderStyle.statusDone}`}>{order.status === "done" ? "Выполнен" : order.status === "pending" ? "В работе" : "Создан"}</p>
            ): null}
          </div>
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
=======
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
>>>>>>> 6a42ab79d79aa1b014865e0c12d214d22067bbf7
      </div>
    );
}

export default FeedOrder;