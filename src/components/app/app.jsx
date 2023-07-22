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
<<<<<<< HEAD
import { OrderDetailsPage } from "../../pages/details-feed/details-feed";
=======
>>>>>>> 6a42ab79d79aa1b014865e0c12d214d22067bbf7
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsFeed } from "../../services/actions/burger-ingredients";
import { getUserFeed } from "../../services/actions/get-user";
import ProtectedRoute from "../protected-route/protected-route";
import { getIngredients, getIngredientsRequest, getIngredientsFailed } from "../../services/selectors/burger-ingredients";
import { getUser } from "../../services/selectors/login";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  
  const background = location.state && location.state.background;

  const ingredients = useSelector(getIngredients);
  const ingredientsRequest = useSelector(getIngredientsRequest);
  const ingredientsFailed  = useSelector(getIngredientsFailed);
  const user = useSelector(getUser);

  const closeModal = () => {
    history.push("/")
  }
  
  useEffect(() => {
    dispatch(getIngredientsFeed());
    dispatch(getUserFeed());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getUserFeed());
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
      {!ingredientsRequest && !ingredientsFailed && ingredients.length && (
        <Switch location={background || location}>
          <Route exact path="/profile">
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </Route>
          <Route exact path="/profile/orders">
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </Route>
          <Route path="/profile/orders/:id">
            <ProtectedRoute>
              <OrderDetailsPage />
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
<<<<<<< HEAD
          <Route exact path="/feed">
            <OrderFeedPage />
          </Route>
          <Route path="/feed/:id">
            <OrderDetailsPage  />
          </Route>
=======
          <Route path="/feed">
            <OrderFeedPage />
          </Route>
>>>>>>> 6a42ab79d79aa1b014865e0c12d214d22067bbf7
          <Route exact={true} path="/">
            <BurgerConstructorPage />
          </Route>
        </Switch>
      )}
      {background && (
        <Switch>
          <Route path="/ingredients/:id">
            <Modal onClose={closeModal} title="Детали ингредиента">
              <IngredientDetails /> 
            </Modal>
          </Route>
          <Route path="/feed/:id">
            <Modal onClose={closeModal}>
              <OrderDetails /> 
            </Modal>
          </Route>
          <Route exact path="/profile/orders/:id">
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
