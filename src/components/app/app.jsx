import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";


function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.mainPage}>
        <BurgerIngredients ingredient={data}/>
        <BurgerConstructor ingredient={data}/>
      </main>
    </div>
  );
}

export default App;