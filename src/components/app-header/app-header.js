import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";
import { NavLink  } from "react-router-dom";

function AppHeader() {

  return (
    <header>
      <div className={appHeaderStyles.header}>
        <nav className={appHeaderStyles.header_menu}>
          <ul className={appHeaderStyles.header_list}>
            <li>
              <a href="#" className={appHeaderStyles.header_link}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default text_color_primary">Конструктор</p>
              </a>
            </li>
            <li>
              <a href="#" className={appHeaderStyles.header_link}>
                <ListIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
              </a>
            </li>
          </ul>
        </nav>
        <div className={appHeaderStyles.header_logo}>
          <Logo /> 
        </div>
        <nav>
          <NavLink to="/profile" className={appHeaderStyles.header_link} activeClassName={appHeaderStyles.active}>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;