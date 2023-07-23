import profilePageStyles from './profile-form.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { updateUserFeed } from "../../services/actions/update-user";
import { useEffect } from 'react';

function ProfileForm() {
  const dispatch = useDispatch();

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
    if (isFormChanged) return
    setForm({ name: user.name, email: user.email, password: '' });
  }

  const isFormChanged = form.name !== user.name || form.email !== user.email || form.password;

  return (
    <div className={profilePageStyles.container}>
      <form className={profilePageStyles.form} onSubmit={resetUser}>
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
            <Button htmlType="submit" type="secondary">
              Отмена
            </Button>
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default ProfileForm;