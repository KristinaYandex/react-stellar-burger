import { TStore } from "../reducers/index"

export const getOrders = (store: TStore) => store.feedReducer.orders;
export const getTotal = (store: TStore) => store.feedReducer.total;
export const getTotalToday = (store: TStore) => store.feedReducer.totalToday;