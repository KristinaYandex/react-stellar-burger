import { TStore } from "../reducers/index"

export const getUser = (store: TStore) => store.getUserReducer.user;
export const getIsAuthChecked = (store: TStore) => store.getUserReducer.isAuthChecked;