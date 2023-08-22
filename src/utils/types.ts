import { Location } from 'history'; 

export type TLocation = {
  background: Location;
}

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  image_large: string;
  image_mobile: string;
  dragInfo: string;
};

export type TBurgerComponent = {
  ingredients: TIngredient[]
}

export type TOrder = {
  createdAt: string;
  ingredients: TIngredient[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export interface IOrder {
  order: TOrder;
};

export interface IIngredient {
  ingredient: TIngredient
};

export type TOrders = {
  orders: TOrder[]
};

export interface Inumber {
  number: string | undefined
};

export interface IId {
  id: string | undefined
};

export type TUser = {
  name: string;
  email: string;
};

export type TOptions = {
  method: string;
  body?: string;
  headers: {
    'Content-Type': string;
    authorization?: string;
  }
}

export type TRefreshData = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}


export type TError = {
  message: string;
}
