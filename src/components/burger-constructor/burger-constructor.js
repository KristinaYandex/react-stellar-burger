import React from "react";
import { useHistory } from "react-router-dom";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import { useState, useMemo } from "react";
import OrderDetails from "../order-details/order-details";
import { createOrderFeed } from "../../services/actions/order-details";
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT, DELETE_INGREDIENT, addIngredient, deleteIngredient, sortIngredient } from "../../services/actions/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";

function BurgerConstructor() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const getallIngredients = (store) => ({
      bun: store.burgerConstructorReducer.bun,
      mainAndSauce: store.burgerConstructorReducer.mainAndSauce
    })
 
    const {bun, mainAndSauce} = useSelector(getallIngredients);

    const getUser = (store) => store.getUserReducer.user;
    const user = useSelector(getUser);
    
    const idIngredients = mainAndSauce.map((item) => item._id); /*Id ингредиентов*/

    const openModal = () =>  {
      setIsOpen(true);
      const bunAndMainSauce = [...idIngredients, bun._id];
      dispatch(createOrderFeed(bunAndMainSauce));
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

    const onDropHandler = (item) => {
      dispatch(addIngredient(item));
    };

    const [, dropTarget] = useDrop({
      accept: "ingredient",
      drop(ingredient) {
        onDropHandler(ingredient);
      },
    });

    const totalSum = React.useMemo(() => mainAndSauce.reduce(
      (price, item) => (price += item.price),
      bun ? bun.price*2 : 0),
      [bun, mainAndSauce]);

    const isValidOrder = Boolean(bun?._id.length) > 0
    
    return (
      <div className={burgerConstructorStyle.container} ref={dropTarget}>
        <div className={burgerConstructorStyle.list}>
          <div className={burgerConstructorStyle.bun}>
            {bun ? (
              <ConstructorElement className="mr-50"
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ): null}
          </div>
          <ul className={burgerConstructorStyle.main}>
            {mainAndSauce.map((ingredient) => {
              const { name, price, image, id } = ingredient
              return (
                <li key={ingredient.id} className={burgerConstructorStyle.mainSauce}>
                  <ConstructorIngredient
                    name={name}
                    price={price}
                    image={image}
                    id={id}
                    dragInfo={{ swappableId: id }}
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