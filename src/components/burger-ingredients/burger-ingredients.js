import React from "react";
import { useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredients from "./burger-ingredients.module.css";
import BurgerComponents from "../burger-components/burger-components";
import {ingredientPropType} from "../../utils/prop-types"
import PropTypes from "prop-types";

function BurgerIngredients({ingredient}) {
    const [current, setCurrent] = React.useState("buns");

    const Tabs = {
      bun: "bun",
      sauce: "sauce",
      main: "main"
    }

    const buns = ingredient.filter((item) => item.type === Tabs.bun); /*Булки*/ 
    const mains = ingredient.filter((item) => item.type === Tabs.main); /*Соусы*/ 
    const sauces = ingredient.filter((item) => item.type === Tabs.sauce); /*Начинки*/ 

    const ingredientsForBurgerRef = useRef();

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
        <div className={burgerIngredients.menu}>
          <Tab value="buns" active={current === "buns"} onClick={executeScroll}>
            Булки
          </Tab>
          <Tab value="sauces" active={current === "sauces"} onClick={executeScroll}>
            Соусы
          </Tab>
          <Tab value="mains" active={current === "mains"} onClick={executeScroll}>
            Начинки
          </Tab>
        </div>
        <div className={burgerIngredients.ingredient_container}>
          <h2 className="text text_type_main-medium" id="buns" ref={ingredientsForBurgerRef}>Булки</h2>
          <BurgerComponents ingredient={buns} ref={scrollRef} />
          <h2 className="text text_type_main-medium" id="sauces" ref={ingredientsForBurgerRef}>Соусы</h2>
          <BurgerComponents ingredient={sauces} ref={scrollRef} />
          <h2 className="text text_type_main-medium" id="mains" ref={ingredientsForBurgerRef}>Начинки</h2>
          <BurgerComponents ingredient={mains} ref={scrollRef} />
        </div>
      </section>
    </>
  );
}

BurgerIngredients.PropType = {
  ingredient: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
}

export default BurgerIngredients;
