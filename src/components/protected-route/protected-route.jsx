import {Redirect, useLocation} from "react-router-dom"; 
import { useSelector } from 'react-redux';

function ProtectedRoute(props) {
  const {
    onlyUnAuth = false, 
    children
  } = props

  const location = useLocation(); 

  const getUser = (store) => store.getUserReducer.user;
  const user = useSelector(getUser);
  const getIsAuthChecked = (store) => store.getUserReducer.isAuthChecked;
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