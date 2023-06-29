import { NavLink } from 'react-router-dom';
import profilePageStyles from './profile.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react'; 

export function ProfilePage() {

  const [form, setForm] = useState({ email: '', password: '' });

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={profilePageStyles.wrapper}>
      <div className={profilePageStyles.container}>
        <nav>
          <NavLink to='/profile'className={profilePageStyles.link} activeClassName={profilePageStyles.link_active}> 
            Профиль
          </NavLink>
          <NavLink to='/profile/orders'className={profilePageStyles.link} activeClassName={profilePageStyles.link_active}> 
            История заказов
          </NavLink>
          <NavLink className={profilePageStyles.link} activeClassName={profilePageStyles.link_active}> 
            Выход
          </NavLink>
          <p>В этом разделе вы можете изменить свои персональные данные</p>
        </nav>
        <form className={profilePageStyles.form}>
          <Input placeholder="Имя" value={form.name} name="name" onChange={onChange} icon="EditIcon"/>
          <EmailInput placeholder="Логин" value={form.email} name="email" onChange={onChange} icon="EditIcon"/>
          <PasswordInput
            placeholder="Пароль"
            value={form.password}
            name="password"
            onChange={onChange}
            icon="EditIcon"
          />
          <Button primary={true}>
            Зарегистрироваться
          </Button>
          <p>Уже зарегистрированы?<NavLink to="/login">Войти</NavLink></p>
        </form>
      </div>
    </div>
  );
}