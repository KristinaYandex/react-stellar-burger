import { NavLink } from 'react-router-dom';
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import forgotPasswordStyles from './forgot-password.module.css';

export function ForgotPasswordPage() {

  const history = useHistory();

  const [form, setForm] = useState({ email: '' });

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getForgotPasswordStatus = (store) => ({
    forgotPasswordRequest: store.forgotPasswordReducer.forgotPasswordRequest,
    forgotPasswordFailed: store.forgotPasswordReducer.forgotPasswordFailed
  })

  const {forgotPasswordRequest, forgotPasswordFailed} = useSelector(getForgotPasswordStatus);

  useEffect(() => {
    const isForgotSendSuccess = !forgotPasswordRequest && !forgotPasswordFailed

    if (isForgotSendSuccess) {
      history.push('/reset-password')
    }
  }, [forgotPasswordRequest, forgotPasswordFailed])

  return (
    <div className={forgotPasswordStyles.wrapper}>
      <div className={forgotPasswordStyles.container}>
        <form className={forgotPasswordStyles.form}>
          <h1 className={forgotPasswordStyles.heading}>Восстановление пароля</h1>
          <EmailInput placeholder="Укажите e-mail" value={form.email} name="email" onChange={onChange} />
          <Button primary={true}>
            Восстановить
          </Button>
          <p>Вспомнили пароль?<NavLink to="/">Войти</NavLink></p>
        </form>
      </div>
    </div>
  );
}