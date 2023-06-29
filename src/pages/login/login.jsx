import { NavLink } from "react-router-dom";
import loginPageStyles from './login.module.css';
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from 'react'; 

export function LoginPage() {

  const [form, setForm] = useState({ email: '', password: '' });

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
          <Button /*onClick={login}*/ primary={true}>
            Войти
          </Button>
          <p>Вы новый пользователь?<NavLink to="/register">Зарегистрироваться</NavLink></p>
          <p>Забыли пароль?<NavLink to="/forgot-password">Восстановить пароль</NavLink></p>
        </form>
      </div>
    </div>
  );
}