import React from "react";
import { useRef, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredients from "./burgeringredients.module.css";
import IngredientBurger from "../ingredientburger/ingredientburger";
import {ingredientPropType} from "../../utils/prop-types"
import PropTypes from "prop-types";


function BurgerIngredients({ingredient}) {
    const [current, setCurrent] = React.useState("buns");

    const buns = ingredient.filter((item) => item.type === "bun"); /*Булки*/ 
    const mains = ingredient.filter((item) => item.type === "main"); /*Соусы*/ 
    const sauces = ingredient.filter((item) => item.type === "sauce"); /*Начинки*/ 

    const ingredientsforburgerRef = useRef();

    const scrollRef = useRef(null);
      function executeScroll(selectTab) {
        setCurrent(selectTab);
        const item = document.getElementById(selectTab);
        if (item) {
          return item.scrollIntoView({ behavior: "smooth" });
        }
      }

  return (
    <>
      <section className={burgerIngredients.section}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <div className={burgerIngredients.menu} style={{ display: 'flex' }}>
          <Tab value="buns" active={current === "buns"} onClick={executeScroll}>
            Булки
          </Tab>
          <Tab value="sauces" active={current === "sauces"}  onClick={executeScroll}>
            Соусы
          </Tab>
          <Tab value="mains" active={current === "mains"} onClick={executeScroll}>
            Начинки
          </Tab>
        </div>
        <div className={burgerIngredients.ingredient_container}>
          <h2 className="text text_type_main-medium" id="buns" ref={ingredientsforburgerRef}>Булки</h2>
          <div className={burgerIngredients.ingredient_list} ref={scrollRef}>
            {buns.map((ingredient) => (
              <IngredientBurger ingredient={ingredient} />
            ))}
          </div>
          <h2 className="text text_type_main-medium" id="sauces" ref={ingredientsforburgerRef}>Соусы</h2>
          <div className={burgerIngredients.ingredient_list} ref={scrollRef}>
            {sauces.map((ingredient) => (
              <IngredientBurger ingredient={ingredient} />
            ))}
          </div>
          <h2 className="text text_type_main-medium" id="mains" ref={ingredientsforburgerRef}>Начинки</h2>
          <div className={burgerIngredients.ingredient_list} ref={scrollRef}>
            {mains.map((ingredient) => (
              <IngredientBurger ingredient={ingredient} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

BurgerIngredients.PropType = {
  ingredient: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
}

export default BurgerIngredients;
