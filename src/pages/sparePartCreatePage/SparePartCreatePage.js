import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition } from "react-transition-group";

import {
  createSparePart,
  updateCreateSparePart,
} from "../sparePartCreatePage/sparePartSlice";

import "./sparePartCreatePage.scss";

const SparePartCreatePage = () => {
  const [anim, setAnim] = useState(false);
  const animref = useRef(null);

  const createSparePartObj = useSelector(
    (state) => state.sparePartSlice.createSparePartObj
  );
  const dispatch = useDispatch();

  const refDescription = useRef();
  const refPrice = useRef();

  useEffect(() => {
    dispatch(
      updateCreateSparePart({
        id: uuidv4(),
        brand: "mercedes",
        model: "s-class",
        generation: "140",
        type: "шаровая опора",
        description: "",
        price: "",
        original: "да",
        availability: "да",
      })
    );

    setAnim(true);
  }, []);

  const onChangeData = (e) => {
    switch (e.target.getAttribute("datafield")) {
      case "brand":
        return dispatch(
          updateCreateSparePart({
            ...createSparePartObj,
            brand: e.target.value,
          })
        );
      case "model":
        return dispatch(
          updateCreateSparePart({
            ...createSparePartObj,
            model: e.target.value,
          })
        );
      case "generation":
        return dispatch(
          updateCreateSparePart({
            ...createSparePartObj,
            generation: e.target.value,
          })
        );
      case "type":
        return dispatch(
          updateCreateSparePart({
            ...createSparePartObj,
            type: e.target.value,
          })
        );
      case "description":
        return dispatch(
          updateCreateSparePart({
            ...createSparePartObj,
            description: e.target.value,
          })
        );
      case "price":
        return dispatch(
          updateCreateSparePart({
            ...createSparePartObj,
            price: e.target.value,
          })
        );
      case "original":
        return dispatch(
          updateCreateSparePart({
            ...createSparePartObj,
            original: e.target.value,
          })
        );
      case "availability":
        return dispatch(
          updateCreateSparePart({
            ...createSparePartObj,
            availability: e.target.value,
          })
        );
      default:
        break;
    }
  };

  const onCreateSparePart = (e) => {
    if (
      createSparePartObj.description !== "" &&
      createSparePartObj.price !== ""
    ) {
      const body = JSON.stringify(createSparePartObj);
      console.log(body);
      dispatch(createSparePart(body));
      refDescription.current.reset();
      refPrice.current.reset();
    } else {
      const errorElem = document.createElement("div");
      errorElem.textContent = "Введите описание и стоимость запчасти";
      errorElem.style.cssText = "color: red;     padding: 10px 0 0 20px;";
      document.querySelector(".boxsparepartcreate__btn_error").after(errorElem);
    }
  };

  return (
    <CSSTransition animref={animref} in={anim} timeout={1000} classNames="anim">
      <div className="spares__box boxsparepartcreate" ref={animref}>
        <div className="boxsparepartcreate__fields">
          <div className="boxsparepartcreate__field">
            <p>Выберите марку автомобиля</p>
            <select datafield="brand" onChange={(e) => onChangeData(e)}>
              <option value="mercedes">mercedes</option>
              <option value="bmw">bmw</option>
              <option value="audi">audi</option>
            </select>
          </div>
          <div className="boxsparepartcreate__field">
            <p>Выберите модель автомобиля</p>
            <select datafield="model" onChange={(e) => onChangeData(e)}>
              <option value="s-class">s-class</option>
              <option value="seven">seven</option>
              <option value="a8">a8</option>
            </select>
          </div>
          <div className="boxsparepartcreate__field">
            <p>Выберите поколение автомобиля</p>
            <select datafield="generation" onChange={(e) => onChangeData(e)}>
              <option value="140">140</option>
              <option value="220">220</option>
              <option value="e38">e38</option>
              <option value="f02">f02</option>
              <option value="80">80</option>
              <option value="d4">d4</option>
            </select>
          </div>
          <div className="boxsparepartcreate__field">
            <p>Выберите тип запчасти</p>
            <select datafield="type" onChange={(e) => onChangeData(e)}>
              <option value="шаровая опора">шаровая опора</option>
              <option value="стойка стабилизатор">стойка стабилизатор</option>
            </select>
          </div>
          <div className="boxsparepartcreate__field">
            <p>Введите описание запчасти</p>
            <textarea
              datafield="description"
              placeholder="Введите описание запчасти"
              onChange={(e) => onChangeData(e)}
              ref={refDescription}
            ></textarea>
          </div>
          <div className="boxsparepartcreate__field">
            <p>Введите стоимость запчасти</p>
            <input
              datafield="price"
              type="text"
              placeholder="Введите стоимость запчасти"
              onChange={(e) => onChangeData(e)}
              ref={refPrice}
            />
          </div>
          <div className="boxsparepartcreate__field">
            <p>Укажите оригинальность запчасти</p>
            <select datafield="original" onChange={(e) => onChangeData(e)}>
              <option value="да">да</option>
              <option value="нет">нет</option>
            </select>
          </div>
          <div className="boxsparepartcreate__field">
            <p>Укажите наличие запчасти</p>
            <select datafield="availability" onChange={(e) => onChangeData(e)}>
              <option value="да">да</option>
              <option value="нет">нет</option>
            </select>
          </div>
        </div>
        <div className="boxsparepartcreate__buttons">
          <NavLink to="/" className={() => "boxsparepartcreate__btn"}>
            ВЕРНУТЬСЯ К СПИСКУ ЗАПЧАСТЕЙ
          </NavLink>
          <NavLink
            to="/sparePartCreate"
            className={() =>
              "boxsparepartcreate__btn boxsparepartcreate__btn_error"
            }
            onClick={onCreateSparePart}
          >
            СОЗДАТЬ ПОЗИЦИЮ ЗАПЧАСТИ
          </NavLink>
        </div>
      </div>
    </CSSTransition>
  );
};

export default SparePartCreatePage;
