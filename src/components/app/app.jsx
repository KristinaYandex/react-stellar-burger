import styles from "./app.module.css";
import { useEffect, useState } from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../utils/api";


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
        <BurgerIngredients ingredient={data} />
        <BurgerConstructor ingredient={data} />
      </main>
    </div>
  );
}

export default App;