import { CSSTransition } from "react-transition-group";
import { useEffect, useState, useRef } from "react";

import "./sparesFooter.scss";

const SparesFooter = () => {
  const [anim, setAnim] = useState(false);
  const animref = useRef(null);

  useEffect(() => {
    setAnim(true);
  }, []);

  return (
    <CSSTransition animref={animref} in={anim} timeout={1000} classNames="anim">
      <div className="spares__box boxfooter" ref={animref}>
        <div className="boxfooter__logo">DVE</div>
      </div>
    </CSSTransition>
  );
};

export default SparesFooter;
