import React, { useEffect } from 'react'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import feedOrderStyle from './feed-order-details.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredients } from '../../services/selectors/burger-ingredients'
import { getOrders } from '../../services/selectors/feed-ws'
import { useParams } from 'react-router-dom'
import { connect, disconnect } from "../../services/actions/feed.ws";

function OrderDetails() {
  const dispatch = useDispatch(); 

  const GET_ORDERS_URL = "wss://norma.nomoreparties.space/orders/all";

  useEffect(() => {
    dispatch(connect(GET_ORDERS_URL));
    return () => {
      dispatch(disconnect());
    }
  }, [dispatch]);
 
    const {id} = useParams();
    const burgerIngredients = useSelector(getIngredients); /*Ингредиенты бургера*/ 

    const orders = useSelector(getOrders); 
    const order = orders?.find((item) => item._id === id); /*Один заказ*/ 

    function idIngredient(ingredient) {
      return burgerIngredients.find((item) => item._id === ingredient); /*Id ингредиента*/
    }

    const idIngredients = order?.ingredients.map((item) => idIngredient(item)); /*Массив всех ингредиентов в заказе по Id*/

    const orderIngredients = burgerIngredients.filter(({_id}) => order?.ingredients.includes(_id))  /*Уникальные элементы*/

    const totalSum = React.useMemo(() => {
      return idIngredients?.reduce((price, item) => {
        return (
          price +
          (item.type === "bun" ? item.price * 2 : 0) +
          (item.type !== "bun" ? item.price : 0)
        );
      }, 0);
    }, [idIngredients]);

    
    /*Дата и время заказа*/
    const dateFromServer = order?.createdAt; 

    const count = (ingredient) => {
      const countIngredient = order.ingredients.filter((id) => id === ingredient._id);
        console.log('ingredient:', ingredient)
        console.log('order.ingredients:', order.ingredients)
        return countIngredient.length;
    };
    
    if (!order) return null

    return (
      <div className={feedOrderStyle.container}>
        <div className={feedOrderStyle.order}>
          <p className={`text text_type_digits-default ${feedOrderStyle.number}`}>{order.number}</p>
          <h3 className={`text text_type_main-medium ${feedOrderStyle.heading}`}>{order.name}</h3>
          <p className={`text text_type_main-default ${feedOrderStyle.statusDone}`}>{order.status === "done" ? "Выполнен" : "Готовится"}</p>
          <p className={`text text_type_main-medium ${feedOrderStyle.text}`}>Состав:</p>
          <div className={feedOrderStyle.details}>
            <ul className={feedOrderStyle.list}>
              {orderIngredients.map((ingredient, index) => {
                return (
                  <li key={index}>
                    <div className={feedOrderStyle.info}>
                      <div className={feedOrderStyle.info}>
                        <div className={feedOrderStyle.image}>
                          <img 
                            src={ingredient.image_mobile}
                            alt="Изображение ингредиента"
                          />
                        </div>
                        <p className="text text_type_main-medium">{ingredient.name}</p>
                        <p className="text text_type_digits-default">{count(ingredient)}☓</p>
                      </div>
                      <div className={feedOrderStyle.cost}>
                        <p className="text text_type_main-medium">{ingredient.price}</p>
                        <CurrencyIcon type="primary"/>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={feedOrderStyle.numberAndDate}>
              <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(dateFromServer)} />
              <div className={feedOrderStyle.cost}>
                <p className="text text_type_digits-default">{totalSum ? totalSum : 0}</p>
                <CurrencyIcon type="primary"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default OrderDetails;