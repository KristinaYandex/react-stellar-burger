import { NavLink, useHistory } from 'react-router-dom';
import resetPasswordStyles from './reset-password.module.css';
import { PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPasswordFeed, RESET_PASSWORD_FEED, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED } from '../../services/actions/reset-password';
import { useDispatch, useSelector } from 'react-redux';
import { registerFeed } from '../../services/actions/register';
import { useState } from 'react'; 

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const getResetPasswordStatus = (store) => ({
    resetPasswordRequest: store.resetPasswordReducer.resetPasswordRequest,
    resetPasswordFailed: store.resetPasswordReducer.resetPasswordFailed
  })
  const {resetPasswordRequest, resetPasswordFailed} = useSelector(getResetPasswordStatus);

  const getUserRegisterStatus = (store) => ({
    createUserRequest: store.registerReducer.createUserRequest,
    createUserFailed: store.registerReducer.createUserFailed
  })
  const {createUserRequest, createUserFailed} = useSelector(getUserRegisterStatus);

  const [form, setForm] = useState({ password: '', token: '' });

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(resetPasswordFeed(form.password, form.token));
    if (!resetPasswordRequest && !resetPasswordFailed) {
      history.push('/login')
    }
  }

  dispatch(registerFeed(form.email, form.password, form.name));
    if (!createUserRequest && !createUserFailed) {
      history.push('/')
    }

  return (
    <div className={resetPasswordStyles.wrapper}>
      <div className={resetPasswordStyles.container}>
        <form className={resetPasswordStyles.form}>
          <h1 className={resetPasswordStyles.heading}>Восстановление пароля</h1>
          <PasswordInput
            placeholder="Введите новый пароль"
            value={form.password}
            name="password"
            onChange={onChange}
          />
          <PasswordInput
            placeholder="Введите код из письма"
            value={form.token}
            name="password"
            onChange={onChange}
          />
          <Button onClick={handleSubmit} htmlType="button" type="primary">
            Сохранить
          </Button>
          <p>Вспомнили пароль?<NavLink to="/">Войти</NavLink></p>
        </form>
      </div>
    </div>
  );
}