import React from "react";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import { useState } from "react";
import OrderDetails from "../order-details/order-details";
import { createOrderFeed } from "../../services/actions/order-details";
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT, DELETE_INGREDIENT, addIngredient, deleteIngredient, sortIngredient } from "../../services/actions/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";

function BurgerConstructor() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const {bun, mainAndSauce} = useSelector((store) => ({
      bun: store.burgerConstructorReducer.bun,
      mainAndSauce: store.burgerConstructorReducer.mainAndSauce,
    }));

    const idIngredients = mainAndSauce.map((item) => item._id); /*Id ингредиентов*/ 

    const openModal = () =>  {
      setIsOpen(true);
      const bunAndMainSauce = [...idIngredients, bun._id];
      dispatch(createOrderFeed(bunAndMainSauce));
    }

    const closeModal = () => {
      setIsOpen(false);
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

    let totalSum = React.useMemo(() => mainAndSauce.reduce(
      (price, item) => (price += item.price),
      bun ? bun.price*2 : 0),
      [bun, mainAndSauce]);
    
    return (
      <div className={burgerConstructorStyle.container} ref={dropTarget}>
        <div className={burgerConstructorStyle.list}>
          {bun ? (
            <ConstructorElement className="mr-50"
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ): null}
          <ul className={burgerConstructorStyle.main}>
            {mainAndSauce.map((ingredient) => {
              const { name, price, image, id } = ingredient
              return (
                <li key={ingredient._id} className={burgerConstructorStyle.mainSauce}>
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
        <div className={burgerConstructorStyle.order}>
          <div className={burgerConstructorStyle.cost}>
            <p className="text text_type_digits-medium">{totalSum ? totalSum : 0}</p>
            <CurrencyIcon type="primary"/>
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={openModal}>
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