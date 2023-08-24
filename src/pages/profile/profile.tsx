import profilePageStyles from './profile.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { useDispatch, useSelector } from '../../utils/store-types'
import { logOutFeedThunk } from "../../services/actions/logout";
import { useHistory, NavLink, Route, Switch } from "react-router-dom";
import ProfileForm from "../../components/profile-form/profile-form";
import FeedLink from "../../components/feed-link/feed-link";
import { getOrderProfile } from "../../services/selectors/feed-profile.ws";
import { TOrder } from "../../utils/types";
import { SyntheticEvent } from "react";

export function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const orders = useSelector(getOrderProfile);

  const onLogout = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    dispatch(
      logOutFeedThunk(() => {
        history.push("/login")
      })
    )
  } 

  const ordersReverse = orders
    ?.slice()
    .sort((a: TOrder, b: TOrder) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <div className={profilePageStyles.container}>
      <nav className={profilePageStyles.menu}>
        <NavLink exact={true} to='/profile' className={`text text_type_main-medium ${profilePageStyles.link}`} activeClassName={profilePageStyles.link_active}> 
          Профиль
        </NavLink>
        <NavLink to='/profile/orders' className={`text text_type_main-medium ${profilePageStyles.link}`} activeClassName={profilePageStyles.link_active}> 
          История заказов
        </NavLink>
        <Button htmlType="submit" className={`text text_type_main-medium text_color_inactive ${profilePageStyles.button}`} onClick={onLogout}> 
          Выход
        </Button>
        <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
      </nav>
      <div>
        <Switch>
          <Route exact path={'/profile'}>
            <ProfileForm />
          </Route>
          <Route path={'/profile/orders'}>
            <div className={profilePageStyles.feedLink}>
              <FeedLink orders={ordersReverse}/>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
}