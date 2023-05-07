import styles from "./app.module.css";
import { useEffect, useState, useRef } from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../utils/api";


function App() {
  const [data, setData] = useState([]);
  const portalRef = useRef(null)
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
        <BurgerIngredients ingredient={data} portalRef={portalRef}/>
        <BurgerConstructor ingredient={data} portalRef={portalRef} />
      </main>
      <div ref={portalRef}/>
    </div>
  );
}

export default App;