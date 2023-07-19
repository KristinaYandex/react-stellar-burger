import { Link, useLocation, useHistory } from "react-router-dom";
import feedLinkStyle from "./feed-link.module.css";
import FeedOrder from "../feed-order/feed-order";
import { openModalOrder } from "../../services/actions/feed.ws";
import { useDispatch } from 'react-redux';

function FeedLink({orders}) {

  const history = useHistory();

  const openModal = (order) => {
    history.replace(`/feed/${order._id}`, {background: true})
  }

  return (
    <div className={feedLinkStyle.container}>
      <ul className={feedLinkStyle.list}>
        {orders ? (
          orders.map((order) => (
            <Link 
              key={order.number} 
              onClick={() => openModal(order)}  
              className={feedLinkStyle.mainSauce}
            >
              <FeedOrder order={order} />
            </Link>
          ))
        ) : null}
      </ul>
    </div>
  );
}

export default FeedLink;

/*function FeedLink({orders}) {
  const dispatch = useDispatch();
  const location = useLocation();

  const onClickOnOrder = () => {
    dispatch(openModalOrder());
  };

  return (
    <div className={feedLinkStyle.container}>
      <ul className={feedLinkStyle.list}>
        {orders ? (
          orders.map((order, index) => (
            <Link 
              key={index} 
              className={feedLinkStyle.main}
              to={`/feed/${order.number}`}
              state={{background: location}}
            >
              <FeedOrder order={order} onClick={onClickOnOrder} className={feedLinkStyle.mainSauce}/>
            </Link>
          ))
        ) : null}
      </ul>
    </div>
  );
}

export default FeedLink;*/