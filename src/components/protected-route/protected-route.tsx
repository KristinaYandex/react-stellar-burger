import {Redirect, useLocation} from "react-router-dom"; 
import { useSelector } from '../../utils/store-types'
import { getUser, getIsAuthChecked} from "../../services/selectors/get-user";
import { FunctionComponent, ReactNode } from 'react';

interface IProps {
  onlyUnAuth?: boolean;
  children?: ReactNode;
} 

interface ILocationState {
  from: {
    pathname: string;
  }
} 

const ProtectedRoute: FunctionComponent<IProps> = ({onlyUnAuth, children}) => {
  
  const location = useLocation<ILocationState>(); 

  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);

  if (!isAuthChecked) {
    return <div>Загрузка...</div>
  }
  
  if (onlyUnAuth && user) {
    
    const { from } = location.state || {from: {pathname: "/"}};

    return <Redirect to={from} />
  }

  if (!onlyUnAuth && !user) {
    return (
      <Redirect
        to = {{
          pathname: "/login",
          state: { from: location }
        }}
      />
    )
  }
  
  return <>{children}</>
}

export default ProtectedRoute;