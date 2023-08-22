import { TStore } from "../reducers/index"

export const getUser = (store: TStore) => store.loginReducer.user;