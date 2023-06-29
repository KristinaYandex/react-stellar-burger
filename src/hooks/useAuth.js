import { useSelector } from "react-redux";

export const useAuth = () => {
  const emailUser = (store) => store.getUserReducer.email;
  const email = useSelector(emailUser);
  const isAuth = email !== null;

  return isAuth;
}