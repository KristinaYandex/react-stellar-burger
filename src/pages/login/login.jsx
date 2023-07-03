import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import loginPageStyles from './login.module.css';
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from 'react'; 
import { authorizationFeed } from '../../services/actions/login';

export function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const getUserAuthorizationStatus = (store) => ({
    authorizationUserRequest: store.loginReducer.authorizationUserRequest,
    authorizationUserFailed: store.loginReducer.authorizationUserFailed
  })

  const {authorizationUserRequest, authorizationUserFailed} = useSelector(getUserAuthorizationStatus);
  
  const [form, setForm] = useState({ email: '', password: '' });

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authorizationFeed(form.email, form.password));
    if (!authorizationUserRequest && !authorizationUserFailed) {
      history.push('/')
    }
  }

  return (
    <div className={loginPageStyles.wrapper}>
      <div className={loginPageStyles.container}>
        <form className={loginPageStyles.form}>
          <h1 className={loginPageStyles.heading}>Вход</h1>
          <EmailInput placeholder="Email" value={form.email} name="email" onChange={onChange} />
          <PasswordInput
            placeholder="Пароль"
            value={form.password}
            name="password"
            onChange={onChange}
          />
          <Button onClick={handleSubmit} htmlType="button" type="secondary">
            Войти
          </Button>
          <p>Вы новый пользователь?<NavLink to="/register">Зарегистрироваться</NavLink></p>
          <p>Забыли пароль?<NavLink to="/forgot-password">Восстановить пароль</NavLink></p>
        </form>
      </div>
    </div>
  );
}