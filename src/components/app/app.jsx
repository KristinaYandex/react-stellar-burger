import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burgeringredients/burgeringredients";
import BurgerConstructor from "../burgerconstructor/burgerconstructor";


function App() {
  return (
    <div className={styles.app}>
      <pre style={{
      	margin: "auto",
      	fontSize: "1.5rem"
      }}>
      </pre>
      <AppHeader />
      <main className={styles.mainPage}>
        <BurgerIngredients ingredient={data}/>
        <BurgerConstructor ingredient={data}/>
      </main>
    </div>
  );
}

export default App;