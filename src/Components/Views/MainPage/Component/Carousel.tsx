import { useCallback, useEffect, useRef, useState } from "react";
import "./Carousel.scss";

const arr = [2, 3, 1, 2, 3, 1, 2];
let idx = 2;
export default function Carousel() {
  const carousel = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(100);

  const timeout = useCallback((idx: number) => {
    const id = setTimeout(() => {
      carousel.current?.classList.remove("transition");
      setTransform(50 * idx);
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, []);
  function navigation(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target instanceof Element) {
      const target = e.target.id;
      if (target === "next") {
        carousel.current?.classList.add("transition");
        idx++;
        setTransform(50 * idx);
        if (idx === arr.length - 2) {
          idx = 2;
          timeout(idx);
        }
      } else if (target === "prev") {
        carousel.current?.classList.add("transition");
        idx--;
        setTransform(50 * idx);
        if (idx === 1) {
          idx = arr.length - 3;
          timeout(idx);
        }
      }
    }
  }
  useEffect(() => {
    const id = setInterval(() => {
      carousel.current?.classList.add("transition");
      idx++;
      setTransform(50 * idx);
      if (idx === arr.length - 2) {
        idx = 2;
        timeout(idx);
      }
    }, 3000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="container">
      <div
        className="carousel"
        style={{ transform: `translateX(${25 - transform}%)` }}
        ref={carousel}
      >
        {arr.map((v, i) => (
          <div className="page" key={i}>
            <img src={`/images/carousel${v}.png`} alt="" />
          </div>
        ))}
      </div>

      <div className="navigation" onClick={navigation}>
        <div id="prev" className="navi">
          &lt;
        </div>
        <div id="next" className="navi">
          &gt;
        </div>
      </div>
    </div>
  );
}
