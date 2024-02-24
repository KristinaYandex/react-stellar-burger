import OrderDetails from "../../components/feed-order-details/feed-order-details";
import feedPageStyle from "./details-feed.module.css";

export function OrderDetailsPage() {
 
  return (
    <main className={feedPageStyle.page}>
      <div className={feedPageStyle.section}>
        <OrderDetails />
      </div>
    </main>
  )
}