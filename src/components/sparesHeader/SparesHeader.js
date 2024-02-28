import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useEffect, useState, useRef } from "react";

import "./sparesHeader.scss";
import logo from "../../assets/dve.jpg";

const SparesHeader = () => {
  const [anim, setAnim] = useState(false);
  const animref = useRef(null);

  useEffect(() => {
    setAnim(true);
  }, []);

  return (
    <CSSTransition animref={animref} in={anim} timeout={1000} classNames="anim">
      <div className="spares__box boxheader" ref={animref}>
        <div className="boxheader__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="boxheader__links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "boxheader__link_active" : "boxheader__link"
            }
          >
            СПИСОК ЗАПЧСТЕЙ
          </NavLink>
          <span>/</span>
          <NavLink
            to="/sparePartCreate"
            className={({ isActive }) =>
              isActive ? "boxheader__link_active" : "boxheader__link"
            }
          >
            СОЗДАНИЕ КАРТОЧКИ ЗАПЧАСТИ
          </NavLink>
        </div>
      </div>
    </CSSTransition>
  );
};

export default SparesHeader;
