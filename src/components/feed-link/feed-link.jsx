<<<<<<< HEAD
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
    history.replace(location.pathname.startsWith('/profile') ? `/profile/orders/${order._id}` : `/feed/${order._id}`, {background: location})
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
  }, [dispatch, profileLink]);

=======
import { Link, useHistory } from "react-router-dom";
import feedLinkStyle from "./feed-link.css";
import FeedOrder from "../feed-order/feed-order";

function FeedLink({orders}) {

  const history = useHistory();

  const openModal = (order) => {
    history.replace(`/feed/${order._id}`, {background: true})
  }

>>>>>>> 6a42ab79d79aa1b014865e0c12d214d22067bbf7
  return (
    <div className={feedLinkStyle.container}>
      <ul className={feedLinkStyle.list}>
        {orders ? (
          orders.map((order) => (
<<<<<<< HEAD
            <div 
              key={order.number} 
              onClick={() => openModal(order)}
              className={feedLinkStyle.mainSauce}
            >
              <FeedOrder order={order} />
            </div>
=======
            <Link 
              key={order.id} 
              onClick={() => openModal(order)}  
              className={feedLinkStyle.mainSauce}
            >
              <FeedOrder order={order} />
            </Link>
>>>>>>> 6a42ab79d79aa1b014865e0c12d214d22067bbf7
          ))
        ) : null}
      </ul>
    </div>
  );
}

export default FeedLink;