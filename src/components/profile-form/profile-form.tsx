import profilePageStyles from './profile-form.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react'; 
import { useDispatch, useSelector } from '../../utils/store-types'
import { updateUserFeedThunk } from "../../services/actions/update-user";
import { useEffect } from 'react';
import { TStore } from "../../services/reducers/index"

function ProfileForm() {
  const dispatch = useDispatch();

  const getUser = (store: TStore) => store.getUserReducer.user;
  const user = useSelector(getUser);
  const userName: string =  user? user.name : '';
  const userEmail: string =  user? user.email : '';

  const [form, setForm] = useState({ name: userName, email: userEmail, password: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(updateUserFeedThunk(form.email, form.name));
  }, [dispatch, form.email, form.name]);

  const resetUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (isFormChanged) return
    setForm({ name: userName, email: userEmail, password: '' });
  }

  const isFormChanged = form.name !== userName || form.email !== userEmail || form.password;

  return (
    <div className={profilePageStyles.container}>
      <form className={profilePageStyles.form} onSubmit={() => resetUser}>
        <Input placeholder="Имя" value={form.name} name="name" onChange={onChange} icon="EditIcon"/>
        <EmailInput placeholder="Логин" value={form.email} name="email" onChange={onChange} />
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