import {Redirect, useLocation} from "react-router-dom"; 
import { useSelector } from 'react-redux';
import { getUser, getIsAuthChecked} from "../../services/selectors/get-user";

function ProtectedRoute(props) {
  const {
    onlyUnAuth = false, 
    children
  } = props

  const location = useLocation(); 

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
  
  return children
}

export default ProtectedRoute;