import { useHistory, useLocation  } from "react-router-dom";
import feedLinkStyle from "./feed-link.module.css";
import FeedOrder from "../feed-order/feed-order";
import { useRouteMatch } from "react-router-dom";
import { useEffect } from 'react';
import { getCookie } from "../../utils/cookie";
import { connectProfile, disconnectProfile } from "../../services/actions/feed-profile.ws";
import { useDispatch } from 'react-redux'; 

function FeedLink({orders}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const openModal = (order) => {
    history.replace(location.pathname.startsWith('/profile') ? `/profile/orders/${order.number}` : `/feed/${order.number}`, {background: location})
  }

  const GET_ORDERS_PROFILE_URL = "wss://norma.nomoreparties.space/orders";

  const profileLink = useRouteMatch("/profile/orders");

  useEffect(() => {
    if (profileLink) {
      const accessToken = getCookie("accessToken");
      console.log(accessToken)
      dispatch(connectProfile(`${GET_ORDERS_PROFILE_URL}?token=${accessToken}`));

    }
    return () => {
      if (profileLink) {
        dispatch(disconnectProfile());
      }
    }
  }, [dispatch]);

  return (
    <div className={feedLinkStyle.container}>
      <ul className={feedLinkStyle.list}>
        {orders ? (
          orders.map((order) => (
            <div 
              key={order.number} 
              onClick={() => openModal(order)}
              className={feedLinkStyle.mainSauce}
            >
              <FeedOrder order={order} />
            </div>
          ))
        ) : null}
      </ul>
    </div>
  );
}

export default FeedLink;