import styles from "./app.module.css";
import { useEffect, useState } from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../utils/api";
import {IngredientsContext} from "../../services/burgerContext.js";


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getIngredients()
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  },[])
  
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.mainPage}>
        <IngredientsContext.Provider value={data}>
          <BurgerIngredients ingredient={data} />
          <BurgerConstructor />
        </IngredientsContext.Provider>
      </main>
    </div>
  );
}

export default App;