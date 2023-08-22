import { TStore } from "../reducers/index"

export const getOrderNumber = (store: TStore) => store.orderDetailsReducer.orderNumber;