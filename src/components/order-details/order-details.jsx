import orderDetails from "./order-details.module.css";
import doneIcon from "../../images/done.svg";
import { useSelector } from "react-redux";

function OrderDetails() {
  const getOrderNumber = (store) => store.orderDetailsReducer.orderNumber;
  const orderNumbers = useSelector(getOrderNumber);

    return (
      <div className={orderDetails.container}>
        <h2 className={`${orderDetails.number} text text_type_digits-large`}>{orderNumbers === null ? null : orderNumbers.number}</h2>
        <p className="text text_type_main-medium">Идентификатор заказа</p>
        <img src={doneIcon} alt="Галочка" className={orderDetails.done}></img>
        <p className="text text_type_main-default">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
      </div>
    )
  }
  
  export default OrderDetails;