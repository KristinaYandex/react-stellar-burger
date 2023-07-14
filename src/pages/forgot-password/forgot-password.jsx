import { NavLink } from 'react-router-dom';
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import forgotPasswordStyles from './forgot-password.module.css';
import { forgotPasswordFeed } from '../../services/actions/forgot-password';
import { useForm } from '../../hooks/useForm';

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { values, handleChange } = useForm({ email: "" });

  const onForgotPassword = (e) => {
    e.preventDefault();
    const input = { email: values.email }
    dispatch(
      forgotPasswordFeed(input, () => {
        history.push("/reset-password")
      })
    )
  }

  return (
    <div className={forgotPasswordStyles.container}>
      <form className={forgotPasswordStyles.form} onSubmit={onForgotPassword}>
        <h2 className={forgotPasswordStyles.heading}>Восстановление пароля</h2>
        <EmailInput placeholder="Укажите e-mail" value={values.email} name="email" onChange={handleChange} />
        <div className={forgotPasswordStyles.button}>
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </div>
      </form>
      <div className={forgotPasswordStyles.links}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?<NavLink to="/login" className={forgotPasswordStyles.link}>Войти</NavLink></p>
      </div>
    </div>
  );
}