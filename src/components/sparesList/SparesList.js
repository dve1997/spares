import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { getSpares } from "./sparesSlice";
import {
  deleteSparePart,
  infoSparePart,
} from "../../pages/sparePartCreatePage/sparePartSlice";
import Spinner from "../spinner/Spinner";

import "./sparesList.scss";

const SparesList = () => {
  const [anim, setAnim] = useState(false);
  const animref = useRef(null);

  const spares = useSelector((state) => state.sparesSlice.spares);
  const filterSearch = useSelector((state) => state.sparesSlice.filterSearch);
  const filterOriginal = useSelector(
    (state) => state.sparesSlice.filterOriginal
  );
  const filterAvailability = useSelector(
    (state) => state.sparesSlice.filterAvailability
  );
  const deleteSparePartId = useSelector(
    (state) => state.sparePartSlice.deleteSparePartId
  );
  const dispatch = useDispatch();

  const filterSearchSpares = (spares, filter) => {
    return spares.filter((item) => item.brand.includes(filter));
  };

  const filterOriginalSpares = (spares, filter) => {
    return spares.filter((item) => {
      if (filter === "все") {
        return item;
      }
      if (item.original.includes(filter)) {
        return item;
      }
    });
  };

  const filterAvailabilitySpares = (spares, filter) => {
    return spares.filter((item) => {
      if (filter === "все") {
        return item;
      }
      if (item.original.includes(filter)) {
        return item;
      }
    });
  };

  useEffect(() => {
    dispatch(getSpares());

    setAnim(true);
  }, [deleteSparePartId]);

  const onDeleteSparePartForId = (id) => {
    dispatch(deleteSparePart(id));
  };

  const onInfoSparePartForId = (id) => {
    dispatch(infoSparePart(id));
  };

  const showSpares = () => {
    if (spares.length === 0) {
      return <Spinner />;
    } else {
      let filterS = filterSearchSpares(spares, filterSearch);
      let filterO = filterOriginalSpares(filterS, filterOriginal);
      let filterA = filterAvailabilitySpares(filterO, filterAvailability);
      return filterA.map((item) => {
        return (
          <SparePart
            key={item.id}
            item={item}
            onDeleteSparePartForId={onDeleteSparePartForId}
            onInfoSparePartForId={onInfoSparePartForId}
          />
        );
      });
    }
  };

  return (
    <CSSTransition animref={animref} in={anim} timeout={1000} classNames="anim">
      <div className="spares__list list" ref={animref}>
        {showSpares()}
      </div>
    </CSSTransition>
  );
};

const SparePart = (props) => {
  const { id, description, price, original, availability } = props.item;

  return (
    <div className="list__item">
      <NavLink
        to={`/sparePartInfo/${id}`}
        className={() => "list__id"}
        onClick={() => props.onInfoSparePartForId(id)}
      >
        {id}
      </NavLink>
      <div className="list__description">Описание: {description}</div>
      <div className="list__price">Цена: {price} руб</div>
      <div className="list__original">Оригинал: {original}</div>
      <div className="list__availability">Наличие: {availability}</div>
      <div
        className="list__delete"
        onClick={() => props.onDeleteSparePartForId(id)}
      >
        &#9746;
      </div>
    </div>
  );
};

export default SparesList;
