import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../feed-order-details/feed-order-details";
import Modal from "../modal/modal";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { BurgerConstructorPage } from "../../pages/constructor-burger/constructor-burger";
import { IngredientDetailsPage } from "../../pages/ingredient-details/ingredient-details";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ProfilePage } from "../../pages/profile/profile";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { OrderFeedPage } from "../../pages/feed/feed";
import { OrderDetailsPage } from "../../pages/details-feed/details-feed";
import { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from '../../utils/store-types'
import { getIngredientsFeedThunk } from "../../services/actions/burger-ingredients";
import { getUserFeedThunk } from "../../services/actions/get-user";
import ProtectedRoute from "../protected-route/protected-route";
import { getIngredients, getIngredientsRequest, getIngredientsFailed } from "../../services/selectors/burger-ingredients";
import { getUser } from "../../services/selectors/login";
import { TLocation } from "../../utils/types";

const App: FunctionComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation<TLocation>();
  const history = useHistory();
  
  const background = location.state && location.state.background;

  const ingredients = useSelector(getIngredients);
  const ingredientsRequest = useSelector(getIngredientsRequest);
  const ingredientsFailed  = useSelector(getIngredientsFailed);
  const user = useSelector(getUser);

  const closeModal = () => {
    const currentURL = location.pathname
    const currentURLArrayParts = currentURL.split('/')
    const currentURLArrayPartsWithoutLastPart = currentURLArrayParts.slice(0, -1)
    const previousURL = currentURLArrayPartsWithoutLastPart.join('/')

    history.replace(previousURL)
  }

  const closeModalIngredient = () => {
    history.push("/")
  }
  
  useEffect(() => {
    dispatch(getIngredientsFeedThunk());
    dispatch(getUserFeedThunk());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getUserFeedThunk());
    }
  }, [dispatch, user]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {ingredientsRequest && !ingredientsFailed && (
        <h2>Загрузка...</h2>
      )}
      {!ingredientsRequest && ingredientsFailed && (
        <h2>Не удалось получить данные</h2>
      )}
      {!ingredientsRequest && !ingredientsFailed && ingredients?.length && (
        <Switch location={background || location}>
          <Route exact path="/profile/orders/:number">
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          </Route>
          <Route path="/profile">
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </Route>
          <Route exact path="/profile/orders">
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </Route>
          <Route path="/login">
            <ProtectedRoute onlyUnAuth>
              <LoginPage />
            </ProtectedRoute>
          </Route>
          <Route path="/register">
            <ProtectedRoute onlyUnAuth>
              <RegisterPage />
            </ProtectedRoute>
          </Route>
          <Route path="/forgot-password">
            <ProtectedRoute onlyUnAuth>
              <ForgotPasswordPage />
            </ProtectedRoute>
          </Route>
          <Route path="/reset-password">
            <ProtectedRoute onlyUnAuth>
              <ResetPasswordPage />
            </ProtectedRoute>
          </Route>
          <Route path="/ingredients/:id">
            <IngredientDetailsPage />
          </Route>
          <Route exact path="/feed">
            <OrderFeedPage />
          </Route>
          <Route path="/feed/:number">
            <OrderDetailsPage  />
          </Route>
          <Route exact={true} path="/">
            <BurgerConstructorPage />
          </Route>
        </Switch>
      )}
      {background && (
        <Switch>
          <Route path="/ingredients/:id">
            <Modal onClose={closeModalIngredient} title="Детали ингредиента">
              <IngredientDetails /> 
            </Modal>
          </Route>
          <Route path="/feed/:number">
            <Modal onClose={closeModal}>
              <OrderDetails /> 
            </Modal>
          </Route>
          <Route exact path="/profile/orders/:number">
            <Modal onClose={closeModal}>
              <OrderDetails /> 
            </Modal>
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;