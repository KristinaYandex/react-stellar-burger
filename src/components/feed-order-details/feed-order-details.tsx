import React, { useEffect } from 'react'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import feedOrderStyle from './feed-order-details.module.css'
import { useDispatch, useSelector } from '../../utils/store-types'
import { getIngredients } from '../../services/selectors/burger-ingredients'
import { useParams } from 'react-router-dom'
import { getHiddenOrdersThunk } from '../../services/actions/get-order'
import { Inumber, TIngredient } from "../../utils/types";
import { FunctionComponent } from 'react';

const OrderDetails: FunctionComponent = () => {
    const dispatch = useDispatch();
 
    const {number} = useParams<Inumber>();
    const burgerIngredients = useSelector(getIngredients); /*Ингредиенты бургера*/ 

    const order = useSelector(store => {
      
      let order = store.feedReducer.orders?.find((el) => String(el.number)) 
      if (order) {
        return order;
      }
      
      order = store.feedReducerProfile.orders?.find((el) => String(el.number) === number) 
      if (order) {
        return order;
      }
      
      order = store.ordersReducer.orders?.find((el) => String(el.number) === number) 
      if (order) {
        return order;
      }
      return null; 
    })

    useEffect(() => {
      if (!order) {
        dispatch(getHiddenOrdersThunk(number))
      }
    }, [dispatch])
    
    function idIngredient(ingredient: TIngredient | string) {
    
      return burgerIngredients.find((item) => item._id === ingredient); /*Id ингредиента*/
    }
   
    const idIngredients = order?.ingredients.map((item) => idIngredient(item)); /*Массив всех ингредиентов в заказе по Id*/
    
    const orderIngredients = burgerIngredients?.filter(({_id}) => (order?.ingredients as unknown as string[]).includes(_id))  /*Уникальные элементы*/

    const totalSum = React.useMemo(() => {
      
      return idIngredients?.reduce((price: number, item) => {
        return (
          price + (item?.price ? item?.price : 0)
        );
      }, 0);
    }, [idIngredients]);
    
    /*Дата и время заказа*/
    const dateFromServer: string = order? order.updatedAt : '';

    const count = (ingredient: TIngredient | string) => {
      if (typeof ingredient !== 'string') {
        const countIngredient = order?.ingredients.filter(({_id}) => _id === ingredient._id);
        return countIngredient?.length;
      }
      return 0
    };
   

    if (!order) return null

    return (
      <div className={feedOrderStyle.container}>
        <div className={feedOrderStyle.order}>
          <p className={`text text_type_digits-default ${feedOrderStyle.number}`}>{order.number}</p>
          <h3 className={`text text_type_main-medium ${feedOrderStyle.heading}`}>{order.name}</h3>
          <p className={`text text_type_main-default ${feedOrderStyle.statusDone}`}>{order.status === "done" ? "Выполнен" : order.status === "pending" ? "В работе" : "Создан"}</p>
          <p className={`text text_type_main-medium ${feedOrderStyle.text}`}>Состав:</p>
          <div className={feedOrderStyle.details}>
            <ul className={feedOrderStyle.list}>
              {orderIngredients.map((ingredient: TIngredient, index: number) => {
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