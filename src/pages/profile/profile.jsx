import profilePageStyles from './profile.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react'; 
import { useDispatch } from 'react-redux'; 
import { logOutFeed } from "../../services/actions/logout";
import { useHistory, NavLink } from "react-router-dom";

export function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(
      logOutFeed(() => {
        history.push("/login")
      })
    )
  } 

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
          <Button htmlType="submit" className="text text_type_main-medium text_color_inactive" onClick={onLogout}> 
            Выход
          </Button>
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
        </form>
      </div>
    </div>
  );
}