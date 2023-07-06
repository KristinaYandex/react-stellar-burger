import { NavLink, useHistory } from 'react-router-dom';
import resetPasswordStyles from './reset-password.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
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

  const [form, setForm] = useState({ password: '', token: '' });

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(resetPasswordFeed(form.password, form.token));
    if (!resetPasswordRequest && !resetPasswordFailed) {
      history.push('/')
    }
  }

  /*const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      resetPasswordFeed(form, () => {
        history.push('/')
      })
    )
  }*/

  return (
    <div className={resetPasswordStyles.container}>
      <form className={resetPasswordStyles.form}>
        <h2 className={resetPasswordStyles.heading}>Восстановление пароля</h2>
        <Input
          placeholder="Введите новый пароль"
          value={form.password}
          name="password"
          onChange={onChange}
        />
        <Input
          placeholder="Введите код из письма"
          value={form.token}
          name="token"
          onChange={onChange}
        />
        <div className={resetPasswordStyles.button}>
          <Button onClick={handleSubmit} htmlType="button" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
      <div className={resetPasswordStyles.links}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?<NavLink to="/login" className={resetPasswordStyles.link}>Войти</NavLink></p>
      </div>
    </div>
  );
}