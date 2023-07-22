import React, { useEffect } from 'react'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import feedOrderStyle from './feed-order-details.module.css'
import { useSelector } from 'react-redux'
import { getIngredients } from '../../services/selectors/burger-ingredients'
import { useParams } from 'react-router-dom'
import { getOrders } from '../../services/selectors/feed-ws'
import { useHistory, useLocation  } from "react-router-dom";

function OrderDetails() {
    const history = useHistory();
    const location = useLocation();
 
    const {id} = useParams();
    const burgerIngredients = useSelector(getIngredients); /*Ингредиенты бургера*/ 

    const order = useSelector(store => {
      let order = store.feedReducer.orders?.find((el) => el._id === id) 
      if (order) {
        return order;
      }
      order = store.feedReducerProfile.orders?.find((el) => el._id === id) 
      if (order) {
        return order;
      }
    })

    /*const orders = useSelector(getOrders); 
    const order = orders?.find((item) => item._id === id); /*Один заказ*/ 

    function idIngredient(ingredient) {
      return burgerIngredients.find((item) => item._id === ingredient); /*Id ингредиента*/
    }

    const idIngredients = order?.ingredients.map((item) => idIngredient(item)); /*Массив всех ингредиентов в заказе по Id*/


    const orderIngredients = burgerIngredients.filter(({_id}) => order?.ingredients.includes(_id))  /*Уникальные элементы*/

    const totalSum = React.useMemo(() => {
      return idIngredients?.reduce((price, item) => {
        return (
          price + item.price
        );
      }, 0);
    }, [idIngredients]);
    
    /*Дата и время заказа*/
    const dateFromServer = order?.createdAt; 

    const count = (ingredient) => {
      const countIngredient = order.ingredients.filter((id) => id === ingredient._id);
        return countIngredient.length;
    };

    useEffect(() => {
      history.replace(location.pathname.startsWith('/profile') ? `/profile/orders/${order._id}` : `/feed/${order._id}`, {background: true})
    }, [location.pathname])
    
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
                      </div>
                      <div className={feedOrderStyle.cost}>
                        <p className="text text_type_digits-default">{count(ingredient)} x</p>
                        <p className="text text_type_digits-default">{ingredient.price}</p>
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
