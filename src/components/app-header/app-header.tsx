import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";
import { NavLink, useRouteMatch  } from "react-router-dom";
import { FunctionComponent } from 'react';

const AppHeader: FunctionComponent = () => {

  const mainLink = useRouteMatch("/");
  const profileLink = useRouteMatch("/profile");
  const orderLink = useRouteMatch("/orders");

  return (
    <header>
      <div className={appHeaderStyles.header}>
        <nav className={appHeaderStyles.header__menu}>
          <ul className={appHeaderStyles.header__list}>
            <li>
              <NavLink exact={true} to="/" className={appHeaderStyles.header__link} activeClassName={appHeaderStyles.link_active}>
                <BurgerIcon type={(mainLink && mainLink.isExact) ? "primary" : "secondary"} />
                <p className="text text_type_main-default">Конструктор</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/feed" className={appHeaderStyles.header__link} activeClassName={appHeaderStyles.link_active}>
                <ListIcon type={orderLink ? "primary" : "secondary"} />
                <p className="text text_type_main-default">Лента заказов</p>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={appHeaderStyles.header__logo}>
          <Logo /> 
        </div>
        <nav>
          <NavLink to="/profile" className={appHeaderStyles.header__link} activeClassName={appHeaderStyles.link_active}>
            <ProfileIcon type={profileLink ? "primary" : "secondary"} />
            <p className="text text_type_main-default">Личный кабинет</p>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;