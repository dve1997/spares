import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { useEffect, useState, useRef } from "react";

import {
  filterSearchSpares,
  filterOriginalSpares,
  filterAvailabilitySpares,
} from "../sparesList/sparesSlice";

import "./sparesNav.scss";

const SparesNav = () => {
  const [anim, setAnim] = useState(false);
  const animref = useRef(null);

  useEffect(() => {
    setAnim(true);
  }, []);

  const dispatch = useDispatch();

  const onfilterSearchSpares = (e) => {
    dispatch(filterSearchSpares(e.target.value));
  };

  const onFilterOriginalSpares = (e) => {
    dispatch(filterOriginalSpares(e.target.getAttribute("datafield")));
  };

  const onFilterAvailabilitySpares = (e) => {
    dispatch(filterAvailabilitySpares(e.target.getAttribute("datafield")));
  };

  return (
    <CSSTransition animref={animref} in={anim} timeout={1000} classNames="anim">
      <div className="spares__nav nav" ref={animref}>
        <div className="nav__search">
          <input
            type="text"
            placeholder="Введите марку автомобиля"
            onChange={(e) => onfilterSearchSpares(e)}
          />
        </div>
        <div className="nav__original">
          <button
            className="nav__btn nav__btn_active"
            datafield="все"
            onClick={(e) => onFilterOriginalSpares(e)}
          >
            ВСЕ
          </button>
          <button
            className="nav__btn"
            datafield="да"
            onClick={(e) => onFilterOriginalSpares(e)}
          >
            ОРИГИНАЛ
          </button>
          <button
            className="nav__btn"
            datafield="нет"
            onClick={(e) => onFilterOriginalSpares(e)}
          >
            АНАЛОГ
          </button>
        </div>
        <div className="nav__availability">
          <button
            className="nav__btn nav__btn_active"
            datafield="все"
            onClick={(e) => onFilterAvailabilitySpares(e)}
          >
            ВСЕ
          </button>
          <button
            className="nav__btn"
            datafield="да"
            onClick={(e) => onFilterAvailabilitySpares(e)}
          >
            ЕСТЬ В НАЛИЧИЕ
          </button>
          <button
            className="nav__btn"
            datafield="нет"
            onClick={(e) => onFilterAvailabilitySpares(e)}
          >
            НЕТ В НАЛИЧИЕ
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default SparesNav;
