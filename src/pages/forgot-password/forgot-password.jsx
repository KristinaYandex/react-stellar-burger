import { NavLink } from 'react-router-dom';
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import forgotPasswordStyles from './forgot-password.module.css';
import { forgotPasswordFeed } from '../../services/actions/forgot-password';

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [form, setForm] = useState({ email: '' });

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onForgotPassword = (e) => {
    e.preventDefault();
    dispatch(
      forgotPasswordFeed(form, () => {
        history.push('/reset-password')
      })
    )
  }

  return (
    <div className={forgotPasswordStyles.container}>
      <form className={forgotPasswordStyles.form} onSubmit={onForgotPassword}>
        <h2 className={forgotPasswordStyles.heading}>Восстановление пароля</h2>
        <EmailInput placeholder="Укажите e-mail" value={form.email} name="email" onChange={onChange} />
        <div className={forgotPasswordStyles.button}>
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </div>
      </form>
      <div className={forgotPasswordStyles.links}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?<NavLink to="/login" className={forgotPasswordStyles.link}>Войти</NavLink></p>
      </div>
    </div>
  );
}