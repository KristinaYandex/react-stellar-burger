import { useState, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredient from "./burger-ingredients.module.css";
import BurgerComponents from "../burger-components/burger-components";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsFeed } from "../../services/actions/burger-ingredients";
import { useInView } from 'react-intersection-observer';
import { visibleIngredient, closeIngredient } from "../../services/actions/ingredient-details";

function BurgerIngredients() {
  const [current, setCurrent] = useState("buns");
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const dispatch = useDispatch();
    
  const getBurgerIngredients = (store) => store.burgerIngredientsReducer.ingredients;
  const burgerIngredients = useSelector(getBurgerIngredients);


  const openModal = (item) => {
    setIsIngredientModalOpen(true);
    dispatch(visibleIngredient(item));
  }

  const closeModal = () => {
    setIsIngredientModalOpen(false);
    dispatch(closeIngredient());
  }

  const Tabs = {
    bun: "bun",
    sauce: "sauce",
    main: "main"
  }

  useEffect(() => {
    dispatch(getIngredientsFeed());
  }, [dispatch]);
  

  const buns = burgerIngredients.filter((item) => item.type === Tabs.bun); /*Булки*/ 
  const mains = burgerIngredients.filter((item) => item.type === Tabs.main); /*Соусы*/ 
  const sauces = burgerIngredients.filter((item) => item.type === Tabs.sauce); /*Начинки*/ 

  function executeScroll(selectTab) {
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
    <>
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
          <h2 className="text text_type_main-medium" id="buns" ref={bunRef}>Булки</h2>
          <BurgerComponents ingredients={buns} openModal={openModal} />
          <h2 className="text text_type_main-medium" id="sauces" ref={sauceRef}>Соусы</h2>
          <BurgerComponents ingredients={sauces}  openModal={openModal} />
          <h2 className="text text_type_main-medium" id="mains" ref={mainRef}>Начинки</h2>
          <BurgerComponents ingredients={mains} openModal={openModal} />
        </div>
        {isIngredientModalOpen && (
          <Modal onClose={closeModal} title="Детали ингредиента">
            <IngredientDetails/> 
          </Modal>)
        }
      </section>
    </>
  );
}

export default BurgerIngredients;