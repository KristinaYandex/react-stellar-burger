import {Redirect, useLocation} from "react-router-dom"; 
import { useSelector } from 'react-redux';

export const RouteTypes = {
  needAuth: "needAuth",
  needLogOut: "needLogOut"
}

function PrivateRoute(props) {
  const {
    type = RouteTypes.needAuth, 
    children
  } = props

  const location = useLocation(); 
  const getUser = (store) => store.getUserReducer.user;
  const user = useSelector(getUser);

  if (type === RouteTypes.needAuth) {
    if (user) {
      return children
    }

    return (
      <Redirect
        to = {{
          pathname: "/login",
          state: { from: location }
        }}
      />
    )
  }

  if (user) {
    const { from } = location.state || {from: {pathname: "/"}};

    return <Redirect to={from} />
  }
  return children
}

export default PrivateRoute;