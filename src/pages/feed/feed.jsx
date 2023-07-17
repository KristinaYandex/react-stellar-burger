import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FeedLink from "../../components/feed-link/feed-link";
import FeedStatus from "../../components/feed-status/feed-status";
import feedPageStyle from "./feed.module.css";
import { getOrders } from "../../services/selectors/feed-ws";
import { wsStart } from "../../services/actions/feed.ws";

export function OrderFeedPage() {
  const orders = useSelector(getOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsStart());
  }, [dispatch]);
 
  return (
    <main>
      <div>
        <h2 className={`${feedPageStyle.heading} text text_type_main-large`}>Лента заказов</h2>
        <FeedLink orders={orders}/>
        <FeedStatus />
      </div>
    </main>
  )
}