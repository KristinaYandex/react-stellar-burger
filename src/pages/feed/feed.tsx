import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FeedLink from "../../components/feed-link/feed-link";
import FeedStatus from "../../components/feed-status/feed-status";
import feedPageStyle from "./feed.module.css";
import { getOrders } from "../../services/selectors/feed-ws";
import { connect, disconnect } from "../../services/actions/feed.ws";

export function OrderFeedPage() {
  const orders = useSelector(getOrders);

  const dispatch = useDispatch();

  const GET_ORDERS_URL = "wss://norma.nomoreparties.space/orders/all";

  useEffect(() => {
    dispatch(connect(GET_ORDERS_URL));
    return () => {
      dispatch(disconnect());
    }
  }, [dispatch]);
 
  return (
    <main className={feedPageStyle.section}>
      <h2 className={`${feedPageStyle.heading} text text_type_main-large`}>Лента заказов</h2>
      <div className={feedPageStyle.mainPage}>
        <div className={feedPageStyle.feedLink}>
          <FeedLink orders={orders}/>
        </div>
        <FeedStatus />
      </div>
    </main>
  )
}