import { Switch, Route } from 'react-router-dom';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { BurgerConstructorPage } from "../../pages/constructor-burger/constructor-burger";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ProfilePage } from "../../pages/profile/profile";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsFeed } from "../../services/actions/burger-ingredients";
import { getUserFeed } from "../../services/actions/get-user";
import PrivateRoute, { RouteTypes } from "../private-route/private-route";

function App() {
  const dispatch = useDispatch();

  const getBurgerIngredients = (store) => store.burgerIngredientsReducer;
  const {ingredients, ingredientsRequest, ingredientsError } = useSelector(getBurgerIngredients);

  const getUser = (store) => store.loginReducer.user;
  const user = useSelector(getUser);
  
  useEffect(() => {
    dispatch(getIngredientsFeed());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getUserFeed());
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUserFeed());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      {ingredientsRequest && !ingredientsError && (
        <h2>Загрузка...</h2>
      )}
      {!ingredientsRequest && ingredientsError && (
        <h2>Не удалось получить данные</h2>
      )}
      {!ingredientsRequest && !ingredientsError && ingredients.length && (
        <Switch>
          <Route path="/profile">
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          </Route>
          <Route path="/login">
            <PrivateRoute type={RouteTypes.needLogOut}>
              <LoginPage />
            </PrivateRoute>
          </Route>
          <Route path="/register">
            <PrivateRoute type={RouteTypes.needLogOut}>
              <RegisterPage />
            </PrivateRoute>
          </Route>
          <Route path="/forgot-password">
            <PrivateRoute type={RouteTypes.needLogOut}>
              <ForgotPasswordPage />
            </PrivateRoute>
          </Route>
          <Route path="/reset-password">
            <PrivateRoute type={RouteTypes.needLogOut}>
              <ResetPasswordPage />
            </PrivateRoute>
          </Route>
          <Route exact={true} path="/">
            <BurgerConstructorPage />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
