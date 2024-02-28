import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { useEffect, useState, useRef } from "react";

import {
  updateAvailabilityPropInSparePart,
  infoSparePart,
  updateInfoSparePart,
} from "../sparePartCreatePage/sparePartSlice";

import "./sparePartInfoPage.scss";

const SparePartInfoPage = () => {
  const [anim, setAnim] = useState(false);
  const animref = useRef(null);

  useEffect(() => {
    setAnim(true);
  }, []);

  const infoSparePartId = useSelector(
    (state) => state.sparePartSlice.infoSparePartId
  );
  const infoSparePartObj = useSelector(
    (state) => state.sparePartSlice.infoSparePartObj
  );
  const dispatch = useDispatch();
  let id = localStorage.getItem("id");

  if (infoSparePartId != undefined) {
    localStorage.setItem("id", infoSparePartId.id);

    const {
      brand,
      model,
      generation,
      type,
      description,
      price,
      original,
      availability,
    } = infoSparePartId;
    const availabilityBack = availability === "да" ? "нет" : "да";

    const onUpdateAvailabilityPropInSparePart = (availability) => {
      dispatch(
        updateInfoSparePart({
          ...infoSparePartId,
          availability,
        })
      );
    };

    const onChangeUpdateAvailabilityPropInSparePart = (body) => {
      if (body.availability !== availability) {
        dispatch(updateAvailabilityPropInSparePart(body));
      }
    };

    return (
      <CSSTransition
        animref={animref}
        in={anim}
        timeout={1000}
        classNames="anim"
      >
        <div className="spares__box boxsparepartinfo" ref={animref}>
          <div className="boxsparepartinfo__fields">
            <div className="boxsparepartinfo__field">
              <p>Марка автомобиля</p>
              <p className="boxsparepartinfo__value">{brand}</p>
            </div>
            <div className="boxsparepartinfo__field">
              <p>Модель автомобиля</p>
              <p className="boxsparepartinfo__value">{model}</p>
            </div>
            <div className="boxsparepartinfo__field">
              <p>Поколение автомобиля</p>
              <p className="boxsparepartinfo__value">{generation}</p>
            </div>
            <div className="boxsparepartinfo__field">
              <p>Тип запчасти</p>
              <p className="boxsparepartinfo__value">{type}</p>
            </div>
            <div className="boxsparepartinfo__field">
              <p>Описание запчасти</p>
              <p className="boxsparepartinfo__value">{description}</p>
            </div>
            <div className="boxsparepartinfo__field">
              <p>Стоимость запчасти</p>
              <p className="boxsparepartinfo__value">{price} руб</p>
            </div>
            <div className="boxsparepartinfo__field">
              <p>Оригинальность запчасти</p>
              <p className="boxsparepartinfo__value">{original}</p>
            </div>
            <div className="boxsparepartinfo__field">
              <p>Укажите наличие запчасти</p>
              <select
                onChange={(e) =>
                  onUpdateAvailabilityPropInSparePart(e.target.value)
                }
              >
                <option value={availability}>{availability}</option>
                <option value={availabilityBack}>{availabilityBack}</option>
              </select>
            </div>
          </div>
          <div className="boxsparepartinfo__buttons">
            <NavLink
              to="/"
              className={() =>
                "boxsparepartinfo__btn boxsparepartinfo__btn_custom"
              }
            >
              ВЕРНУТЬСЯ К СПИСКУ ЗАПЧАСТЕЙ
            </NavLink>
            <NavLink
              to="/sparePartInfo/id"
              className={() => "boxsparepartinfo__btn"}
              onClick={() =>
                onChangeUpdateAvailabilityPropInSparePart(infoSparePartObj)
              }
            >
              ИМЕНИТЬ ДОСТУПНОСТЬ ЗАПЧАСТИ
            </NavLink>
          </div>
        </div>
      </CSSTransition>
    );
  } else {
    dispatch(infoSparePart(id));
  }
};

export default SparePartInfoPage;
