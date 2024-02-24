import React from "react";
import { useHistory } from "react-router-dom";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import { useState, useMemo } from "react";
import OrderDetails from "../order-details/order-details";
import { createOrderFeedThunk } from "../../services/actions/order-details";
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT, DELETE_INGREDIENT, addIngredient, deleteIngredient, sortIngredient } from "../../services/actions/burger-constructor";
import { useDispatch, useSelector } from '../../utils/store-types'
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import { getBun, getMainAndSauce } from "../../services/selectors/burger-constructor";
import { getUser } from "../../services/selectors/get-user";
import { TIngredient } from "../../utils/types";
import { FunctionComponent } from 'react';

const BurgerConstructor: FunctionComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
 
    const bun = useSelector(getBun);
    const mainAndSauce = useSelector(getMainAndSauce);
    const user = useSelector(getUser);
    
    const idIngredients = mainAndSauce.map((item: TIngredient) => item._id); /*Id ингредиентов*/

    const openModal = () =>  {
      setIsOpen(true);
      const mainAndSauceAndBunId = [bun?._id, ...idIngredients, bun?._id]; /*Id ингредиентов с булками*/
      dispatch(createOrderFeedThunk(mainAndSauceAndBunId));
    }

    const closeModal = () => {
      setIsOpen(false);
    }

    const onOpenButtonClick = () => {
      if (user) {
        openModal();
      } else {
        history.push("/login");
      }
    }

    const onDropHandler = (item: TIngredient) => {
      dispatch(addIngredient(item));
    };

    const [, dropTarget] = useDrop({
      accept: "ingredient",
      drop(ingredient: TIngredient) {
        onDropHandler(ingredient);
      },
    });

    const totalSum = React.useMemo(() => mainAndSauce.reduce(
      (price: number, item: TIngredient) => (price += item.price),
      bun ? bun.price*2 : 0),
      [bun, mainAndSauce]);

    const isValidOrder = Boolean(bun?._id)
    
    return (
      <div className={burgerConstructorStyle.container} ref={dropTarget}>
        <div className={burgerConstructorStyle.list}>
          <div className={burgerConstructorStyle.bun}>
            {bun ? (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ): null}
          </div>
          <ul className={burgerConstructorStyle.main}>
            {mainAndSauce.map((ingredient: TIngredient) => {
              /*const { name, price, image, id } = ingredient*/
              return (
                <li key={ingredient._id} className={burgerConstructorStyle.mainSauce}>
                  <ConstructorIngredient
                    name={ingredient.name}
                    price={ingredient.price}
                    image={ingredient.image}
                    id={ingredient._id}
                    dragInfo={{ swappableId: ingredient._id }}
                  />
                </li>
              );
            })}
          </ul>
          <div className={burgerConstructorStyle.bun}>
            {bun ? (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ): null}
          </div>
        </div>
        <div className={burgerConstructorStyle.order}>
          <div className={burgerConstructorStyle.cost}>
            <p className="text text_type_digits-medium">{totalSum ? totalSum : 0}</p>
            <CurrencyIcon type="primary"/>
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={onOpenButtonClick} disabled={!isValidOrder}>
            Оформить заказ
          </Button>
        </div>
        {isOpen && (
          <Modal onClose={closeModal}>
            <OrderDetails />
          </Modal>)
        }
      </div>
    );
}

export default BurgerConstructor;