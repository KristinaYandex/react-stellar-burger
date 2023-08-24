import { NavLink, useHistory, Redirect } from 'react-router-dom';
import resetPasswordStyles from './reset-password.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPasswordFeedThunk } from '../../services/actions/reset-password';
import { useDispatch, useSelector } from '../../utils/store-types'
import { useState } from 'react'; 
import { getUser } from "../../services/selectors/login";
import { getSuccess } from "../../services/selectors/forgot-password";
import { TStore } from "../../services/reducers/index"

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(getUser);
  const success = useSelector(getSuccess);

  const getResetPasswordStatus = (store: TStore) => ({
    resetPasswordRequest: store.resetPasswordReducer.resetPasswordRequest,
    resetPasswordFailed: store.resetPasswordReducer.resetPasswordFailed
  })
  const {resetPasswordRequest, resetPasswordFailed} = useSelector(getResetPasswordStatus);

  const [form, setForm] = useState({ password: '', token: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    dispatch(resetPasswordFeedThunk(form.password, form.token));
    if (!resetPasswordRequest && !resetPasswordFailed) {
      history.push('/login')
    }
  }

  if (user) {
    return <Redirect to={"/"} />
  }

  if (!success) {
    return (<Redirect to={"/forgot-password"} />)
  }

  return (
    <div className={resetPasswordStyles.container}>
      <form className={resetPasswordStyles.form}>
        <h2 className={resetPasswordStyles.heading}>Восстановление пароля</h2>
        <Input
          placeholder="Введите новый пароль"
          value={form.password}
          name="password"
          onChange={onChange}
        />
        <Input
          placeholder="Введите код из письма"
          value={form.token}
          name="token"
          onChange={onChange}
        />
        <div className={resetPasswordStyles.button}>
          <Button onClick={handleSubmit} htmlType="button" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
      <div className={resetPasswordStyles.links}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?<NavLink to="/login" className={resetPasswordStyles.link}>Войти</NavLink></p>
      </div>
    </div>
  );
}