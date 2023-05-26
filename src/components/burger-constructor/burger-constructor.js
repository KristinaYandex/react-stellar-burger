import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";
import {ingredientPropType} from "../../utils/prop-types"
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import { useState, useReducer, useContext, useEffect } from "react";
import OrderDetails from "../order-details/order-details";
import {IngredientsContext, OrderContext} from "../../services/burgerContext.js";
import {postIngredients} from "../../utils/api";

function BurgerConstructor() {
    const ingredient = useContext(IngredientsContext);
    const [order, setOrder] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const mainAndSauce = ingredient.filter((item) => item.type !== "bun"); /*Начинки и соусы*/ 

    const bun = ingredient.find((item) => item.type === "bun"); /*Булки*/ 
    const idIngredients = ingredient.map((item) => item._id); /*Id ингредиентов*/ 

    function postOrder() {
      postIngredients(idIngredients)
      .then((res) => {
        setOrder(res.order.number);
      })
      .catch((err) => {
        console.log(err);
      })
    }

    const openModal = () =>  {
      setIsOpen(true);
      postOrder();
    }

    const closeModal = () => {
      setIsOpen(false);
    }

    const total = {price: 0};
    function reducer(state, action) {
      switch (action.type) { 
        case "plus": 
          return {
            price: state.price + action.pay
          };
          case "minus":
            return {
              price: state.price - action.pay
            };
          case "reset":
            return total;
          default:
            return state; 
      }  
    } 

    const [totalState, totalDispatch] = useReducer(reducer, total);

    useEffect(() => {
      if(bun) {
        totalDispatch({ type: 'plus', pay: bun.price * 2 })
      } if(mainAndSauce) {
        const sum = mainAndSauce.reduce((previousValue, ingredient) => {
          return previousValue + ingredient.price
        }, 0) 
        totalDispatch({ type: 'plus', pay: sum })
      }
    }, [ingredient])
    
    return (
      <div className={burgerConstructorStyle.container}>
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
              return (
                <li key={ingredient._id} className={burgerConstructorStyle.mainSauce}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
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
            <p className="text text_type_digits-medium">{totalState.price}</p>
            <CurrencyIcon type="primary"/>
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={openModal}>
            Оформить заказ
          </Button>
        </div>
        <OrderContext.Provider value={order}>
          {isOpen && (
            <Modal onClose={closeModal}>
              <OrderDetails />
            </Modal>)
          }
        </OrderContext.Provider>
      </div>
    );
}

BurgerConstructor.propTypes = {
  ingredient: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  order: PropTypes.number.isRequired
}

export default BurgerConstructor;