import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burgerconstructor.module.css";
import {ingredientPropType} from "../../utils/prop-types"
import PropTypes from "prop-types";

function BurgerConstructor({ingredient}) {
  
    const mainAndSauce = ingredient.filter((item) => item.type !== "bun"); /*Начинки и соусы*/ 
    const bun = ingredient.find((item) => item.type === "bun") /*Булки*/ 
    
    return (
      <div className={burgerConstructorStyle.container}>
        <div className={burgerConstructorStyle.list}>
          <div className={burgerConstructorStyle.buns}>
            {bun ? (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ): null}
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
          <ul className={burgerConstructorStyle.main}>
            {mainAndSauce.map((ingredient) => {
              return (
                <li className={burgerConstructorStyle.mainSauce}>
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
        </div>
        <div className={burgerConstructorStyle.order}>
          <div className={burgerConstructorStyle.cost}>
            <p className="text text_type_digits-medium">610</p>
            <CurrencyIcon type="primary"/>
          </div>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    );
}

BurgerConstructor.PropType = {
  ingredient: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}

export default BurgerConstructor ;