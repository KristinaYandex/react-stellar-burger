import profilePageStyles from './profile.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { logOutFeed } from "../../services/actions/logout";
import { updateUserFeed } from "../../services/actions/update-user";
import { useHistory, NavLink } from "react-router-dom";
import { useEffect } from 'react';

export function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const getUser = (store) => store.getUserReducer.user;
  const user = useSelector(getUser);

  const [form, setForm] = useState({ name: user.name, email: user.email, password: '' });

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(updateUserFeed(form.email, form.name));
  }, [dispatch, form.email, form.name]);

  const resetUser = (e) => {
    e.preventDefault();
    setForm({ name: user.name, email: user.email, password: '' });
  }

  const isFormChanged = form.name !== user.name || form.email !== user.email || form.password;

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(
      logOutFeed(() => {
        history.push("/login")
      })
    )
  } 

  return (
    <div className={profilePageStyles.container}>
      <nav className={profilePageStyles.menu}>
        <NavLink exact={true} to='/profile' className={`text text_type_main-medium ${profilePageStyles.link}`} activeClassName={profilePageStyles.link_active}> 
          Профиль
        </NavLink>
        <NavLink to='/profile/orders' className={`text text_type_main-medium ${profilePageStyles.link}`} activeClassName={profilePageStyles.link_active}> 
          История заказов
        </NavLink>
        <Button htmlType="submit" className={`text text_type_main-medium text_color_inactive ${profilePageStyles.button}`} onClick={onLogout}> 
          Выход
        </Button>
        <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
      </nav>
      <form className={profilePageStyles.form} /*onSubmit={updateUser}*/>
        <Input placeholder="Имя" value={form.name} name="name" onChange={onChange} icon="EditIcon"/>
        <EmailInput placeholder="Логин" value={form.email} name="email" onChange={onChange} icon="EditIcon"/>
        <PasswordInput
          placeholder="Пароль"
          value={form.password}
          name="password"
          onChange={onChange}
          icon="EditIcon"
        />
        {isFormChanged ? (
          <div>
            <Button htmlType="submit" type="primary">
              Сохранить
            </Button>
            <Button onClick={resetUser} type="secondary" htmlType="button">
              Отмена
            </Button>
          </div>
        ) : null}
      </form>
    </div>
  );
}