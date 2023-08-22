import { NavLink, useHistory } from "react-router-dom";
import registerPageStyles from './register.module.css';
import { useDispatch } from 'react-redux';
import { registerFeedThunk } from '../../services/actions/register';
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from 'react-redux';
import { useState } from 'react'; 
import { TStore } from "../../services/reducers/index"

export function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const getUserRegisterStatus = (store: TStore) => ({
    createUserRequest: store.registerReducer.createUserRequest,
    createUserFailed: store.registerReducer.createUserFailed
  })

  const {createUserRequest, createUserFailed} = useSelector(getUserRegisterStatus);

  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerFeedThunk(form.email, form.password, form.name));
    if (!createUserRequest && !createUserFailed) {
      history.push('/')
    }
  }

  return (
    <div className={registerPageStyles.container}>
      <form className={registerPageStyles.form} onSubmit={handleSubmit}>
        <h2 className={registerPageStyles.heading}>Регистрация</h2>
        <Input placeholder="Имя" value={form.name} name="name" onChange={onChange} />
        <EmailInput placeholder="Email" value={form.email} name="email" onChange={onChange} />
        <PasswordInput
          placeholder="Пароль"
          value={form.password}
          name="password"
          onChange={onChange}
        />
        <div className={registerPageStyles.button}>
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
      </form> 
      <div className={registerPageStyles.links}>
        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?<NavLink to="/login" className={registerPageStyles.link}>Войти</NavLink></p>
      </div>
    </div>
  );
}