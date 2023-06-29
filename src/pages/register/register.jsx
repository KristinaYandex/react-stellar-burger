import { NavLink, useHistory } from "react-router-dom";
import registerPageStyles from './register.module.css';
import { useDispatch } from 'react-redux';
import { registerFeed } from '../../services/actions/register';
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from 'react-redux';
import { useState } from 'react'; 

export function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const getUserRegisterStatus = (store) => ({
    createUserRequest: store.registerReducer.createUserRequest,
    createUserFailed: store.registerReducer.createUserFailed
  })

  const {createUserRequest, createUserFailed} = useSelector(getUserRegisterStatus);

  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerFeed(form.email, form.password, form.name));
    if (!createUserRequest && !createUserFailed) {
      history.push('/')
    }
  }

  return (
    <div className={registerPageStyles.wrapper}>
      <div className={registerPageStyles.container}>
        <form className={registerPageStyles.form}>
          <h1 className={registerPageStyles.heading}>Регистрация</h1>
          <Input placeholder="Имя" value={form.name} name="name" onChange={onChange} />
          <EmailInput placeholder="Email" value={form.email} name="email" onChange={onChange} />
          <PasswordInput
            placeholder="Пароль"
            value={form.password}
            name="password"
            onChange={onChange}
          />
          <Button onClick={handleSubmit} primary={true}>
            Зарегистрироваться
          </Button>
          <p>Уже зарегистрированы?<NavLink to="/login">Войти</NavLink></p>
        </form> 
      </div>
    </div>
  );
}