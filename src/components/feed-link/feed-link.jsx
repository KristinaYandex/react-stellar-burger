import { useHistory } from "react-router-dom";
import feedLinkStyle from "./feed-link.module.css";
import FeedOrder from "../feed-order/feed-order";


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