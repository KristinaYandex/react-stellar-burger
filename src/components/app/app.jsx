import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { BurgerConstructorPage } from "../../pages/constructor-burger/constructor-burger";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ProfilePage } from "../../pages/profile/profile";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";

function App() {
  
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/forgot-password">
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password">
            <ResetPasswordPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/">
            <BurgerConstructorPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;