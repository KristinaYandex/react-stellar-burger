import feedStatusStyle from "./feed-status.module.css";
import { getOrders, getTotal, getTotalToday } from "../../services/selectors/feed-ws";
import { useSelector } from 'react-redux';

function FeedStatus() {
  const orders = useSelector(getOrders);
  const ordersTotal = useSelector(getTotal);
  console.log(orders);
  console.log(ordersTotal);
  const ordersTotalToday = useSelector(getTotalToday);

  const Tabs = {
    done: "done",
    pending: "pending"
  }
  
  const ordersReady = orders.filter((order) => order.status === Tabs.done); /*Готовые заказы*/ 
  const ordersAtWork = orders.filter((order) => order.status !== Tabs.done); /*Заказы в работе*/

  return (
    <div className={feedStatusStyle.container}>
      <div className={feedStatusStyle.status}>
        <div className={feedStatusStyle.numberAndDate}>
          <p className="text text_type_main-medium">Готовы:</p>
          <ul className={feedStatusStyle.list}>
            {ordersReady.map((order, index) => {
              if (index > 10) {
                return null
              } else if (index <= 10) {
                return (
                  <li key={index} className={`${feedStatusStyle.numberReady} text text_type_digits-default`}>{order.number}</li>
                );
              }
            })}
          </ul>
        </div>
        <div className={feedStatusStyle.numberAndDate}>
          <p className="text text_type_main-medium">В работе:</p>
          <ul className={feedStatusStyle.list}>
            {ordersAtWork.map((order, index) => {
              if (index > 10) {
                return null
              } else if (index <= 10) {
                return (
                  <li key={index} className={feedStatusStyle.mainSauce}>{order.number}</li>
                );
              }
            })}
          </ul>
        </div>
      </div>
      <div className={feedStatusStyle.total}>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className="text text_type_digits-large">{ordersTotal}</p>
      </div>
      <div className={feedStatusStyle.total}>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className="text text_type_digits-large">{ordersTotalToday}</p>
      </div>
    </div>
  );
}

export default FeedStatus;