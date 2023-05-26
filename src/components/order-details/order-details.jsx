import orderDetails from "./order-details.module.css";
import doneIcon from "../../images/done.svg";
import {OrderContext} from "../../services/burgerContext.js"
import { useContext } from "react";
import PropTypes from 'prop-types';

function OrderDetails() {
    const orderNumber = useContext(OrderContext);
    return (
      <div className={orderDetails.container}>
        <h2 className={`${orderDetails.number} text text_type_digits-large`}>{orderNumber}</h2>
        <p className="text text_type_main-medium">Идентификатор заказа</p>
        <img src={doneIcon} alt="Галочка" className={orderDetails.done}></img>
        <p className="text text_type_main-default">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
      </div>
    )
  }

  OrderDetails.propTypes = {
    order: PropTypes.number.isRequired
  }
  
  export default OrderDetails;