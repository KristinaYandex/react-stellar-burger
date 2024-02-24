import React from "react";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import feedOrderStyle from "./feed-order.module.css";
import { useSelector } from '../../utils/store-types'
import { getIngredients } from "../../services/selectors/burger-ingredients";
import { useRouteMatch } from "react-router-dom";
import { IOrder, TIngredient, IIngredient } from "../../utils/types";
import { FunctionComponent } from 'react';

const FeedOrder: FunctionComponent<IOrder> = ({order}) => {
    const burgerIngredients = useSelector(getIngredients); /*Ингредиенты бургера*/ 

    function idIngredient(ingredient: TIngredient | string) {
      return burgerIngredients.find((item) => item._id === ingredient); /*Id ингредиента*/
    }

    const idIngredients = order.ingredients.map((item) => idIngredient(item)).filter(Boolean); /*Массив всех ингредиентов в заказе по Id*/

    const profileFeedLink = useRouteMatch("/profile/orders");
    
    const totalSum = React.useMemo(() => {
      return idIngredients?.reduce((price, item) => {
        return (
          price + (item?.price ? item?.price : 0)
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
                        src={ingredient?.image_mobile}
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