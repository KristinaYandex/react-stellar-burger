import { TStore } from "../reducers/index"

export const getBun = (store: TStore) => store.burgerConstructorReducer.bun;
export const getMainAndSauce = (store: TStore) => store.burgerConstructorReducer.mainAndSauce;