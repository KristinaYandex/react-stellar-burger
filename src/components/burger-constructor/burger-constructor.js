import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";
import {ingredientPropType} from "../../utils/prop-types"
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import { useState } from "react";
import OrderDetails from "../order-details/order-details"

function BurgerConstructor({ingredient, portalRef}) {
  
    const mainAndSauce = ingredient.filter((item) => item.type !== "bun"); /*Начинки и соусы*/ 
    const bun = ingredient.find((item) => item.type === "bun") /*Булки*/ 

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () =>  {
      setIsOpen(true);
    }

    const closeModal = () => {
      setIsOpen(false);
    }
    
    return (
      <div className={burgerConstructorStyle.container}>
        <div className={burgerConstructorStyle.list}>
          {bun ? (
            <ConstructorElement
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
            <p className="text text_type_digits-medium">610</p>
            <CurrencyIcon type="primary"/>
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={openModal}>
            Оформить заказ
          </Button>
        </div>
        {isOpen && (
          <Modal onClose={closeModal} portalRef={portalRef}>
            <OrderDetails />
          </Modal>)
        }
      </div>
    );
}

BurgerConstructor.propTypes = {
  ingredient: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}

export default BurgerConstructor;