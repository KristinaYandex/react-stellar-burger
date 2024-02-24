import { useState, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredient from "./burger-ingredients.module.css";
import BurgerComponents from "../burger-components/burger-components";
import { useSelector } from '../../utils/store-types'
import { useInView } from 'react-intersection-observer';
import { getIngredients } from "../../services/selectors/burger-ingredients";
import { FunctionComponent } from 'react';

const BurgerIngredients: FunctionComponent = () => {
  const [current, setCurrent] = useState("buns");
    
  const burgerIngredients = useSelector(getIngredients);

  const Tabs = {
    bun: "bun",
    sauce: "sauce",
    main: "main"
  }
  
  const buns = burgerIngredients.filter((item) => item.type === Tabs.bun); /*Булки*/ 
  const mains = burgerIngredients.filter((item) => item.type === Tabs.main); /*Соусы*/ 
  const sauces = burgerIngredients.filter((item) => item.type === Tabs.sauce); /*Начинки*/ 

  function executeScroll(selectTab: string) {
    setCurrent(selectTab);
    const item = document.getElementById(selectTab);
    if (item) {
      return item.scrollIntoView({ behavior: "smooth" });
    }
  }

  const [ bunRef, bunInView ] = useInView({
    threshold: 0,
  });

  const [ sauceRef, sauceInView ] = useInView({
    threshold: 0,
  });

  const [ mainRef, mainInView ] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (bunInView) {
      setCurrent("buns")
    } else if (sauceInView) {
      setCurrent("sauces")
    } else if (mainInView) {
      setCurrent("mains")
    }
  }, [bunInView, sauceInView, mainInView])

  return (
    <section className={burgerIngredient.section}> 
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={burgerIngredient.menu}>
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
      <div className={burgerIngredient.ingredient_container}>
        <h2 className="text text_type_main-medium" id="buns">Булки</h2>
        <BurgerComponents ingredients={buns} ref={bunRef} />
        <h2 className="text text_type_main-medium" id="sauces">Соусы</h2>
        <BurgerComponents ingredients={sauces} ref={sauceRef} />
        <h2 className="text text_type_main-medium" id="mains">Начинки</h2>
        <BurgerComponents ingredients={mains} ref={mainRef} />
      </div>
    </section>
  );
}

export default BurgerIngredients;