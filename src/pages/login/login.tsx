import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import loginPageStyles from './login.module.css';
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEventHandler, useState } from 'react'; 
import { authorizationFeedThunk } from '../../services/actions/login';
import { TStore } from "../../services/reducers/index"

export function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const getUserAuthorizationStatus = (store: TStore) => ({
    authorizationUserRequest: store.loginReducer.authorizationUserRequest,
    authorizationUserFailed: store.loginReducer.authorizationUserFailed
  })

  const {authorizationUserRequest, authorizationUserFailed} = useSelector(getUserAuthorizationStatus);
  
  const [form, setForm] = useState({ email: '', password: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authorizationFeedThunk(form.email, form.password));
    if (!authorizationUserRequest && !authorizationUserFailed) {
      history.go(-1)
    }
  }

  return (
    <div className={loginPageStyles.container}>
      <form className={loginPageStyles.form} onSubmit={handleSubmit}>
        <h2 className={loginPageStyles.heading}>Вход</h2>
        <EmailInput placeholder="Email" value={form.email} name="email" onChange={onChange} />
        <PasswordInput
          placeholder="Пароль"
          value={form.password}
          name="password"
          onChange={onChange}
        />
        <div className={loginPageStyles.button}>
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </div>
      </form>
      <div className={loginPageStyles.links}>
        <p className="text text_type_main-default text_color_inactive">Вы - новый пользователь?<NavLink to="/register" className={loginPageStyles.link}>Зарегистрироваться</NavLink></p>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль?<NavLink to="/forgot-password" className={loginPageStyles.link}>Восстановить пароль</NavLink></p>
      </div>
    </div>
  );
}