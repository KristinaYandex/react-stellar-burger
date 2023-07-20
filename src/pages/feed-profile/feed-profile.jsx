import { useSelector } from 'react-redux';
import FeedLink from "../../components/feed-link/feed-link";
import feedPageStyle from "./feed-profile.module.css";
import { getOrders } from "../../services/selectors/feed-ws";
/*import { getCookie } from "../../utils/cookie";
import { connectProfile, disconnectProfile } from "../../services/actions/feed-profile.ws";
import { useDispatch } from 'react-redux'; 
import { useRouteMatch } from "react-router-dom";
import { useEffect } from 'react';*/

export function OrderFeedProfilePage() {
  const orders = useSelector(getOrders);

  /*const dispatch = useDispatch();*/

  /*const GET_ORDERS_PROFILE_URL = "wss://norma.nomoreparties.space/orders";

  const profileLink = useRouteMatch("/profile/orders");

  useEffect(() => {
    if (profileLink) {
      const accessToken = getCookie("accessToken");
      console.log(accessToken)
      dispatch(connectProfile(GET_ORDERS_PROFILE_URL));
      dispatch(connectProfile(`${GET_ORDERS_PROFILE_URL}?token=${accessToken}`));

    }
    return () => {
      if (profileLink) {
        dispatch(disconnectProfile());
      }
    }
  }, [dispatch]);*/
 
  return (
    <main className={feedPageStyle.section}>
      <h2 className={`${feedPageStyle.heading} text text_type_main-large`}>Лента заказов</h2>
      <div className={feedPageStyle.mainPage}>
        <FeedLink orders={orders}/>
      </div>
    </main>
  )
}