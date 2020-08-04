import React, { useEffect, useState } from "react";
import "../loading/laoding.css";
import "./home.css";
import useData from "../../hooks/useStore";
import Button from "../../components/button/button";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pushHistory } from "../../redux/actions/shared";
import { panels } from "../../data/panels_new";
import { getViewData } from "./../../redux/methods/panel-pocessing";
import { setCurrentLocation } from "./../../redux/actions/shared";
import StyledTitle from "../../components/styled-title/styled-title";
import HomePanel from "./home-panel/home-panel";
import { ChevronRight, ChevronLeft } from "@material-ui/icons";
import SimpleSelect from "../../components/simple-select/simple-select";

const HomePage = (props) => {
  const dispatch = useDispatch();
  const { app, panels = [] } = useData().sharedReducer;
  const { all_views = [] } = app;
  const [carouselValue, setCarouselValue] = useState(0);

  const maxNumberOfScrolls = Math.ceil(panels.length / 3);
  const disableRightCondition =
    Math.abs(carouselValue / 56) !== maxNumberOfScrolls - 1;

  useEffect(() => {
    if (!!app) dispatch(setCurrentLocation(app?.subject_area[0]?.name));
  }, []);

  const handleRight = () => {
    if (disableRightCondition) setCarouselValue(carouselValue - 56);
  };

  const handleLeft = () => {
    if (carouselValue !== 0) setCarouselValue(carouselValue + 56);
  };

  const leftDisabelCarsoulStyle =
    carouselValue !== 0
      ? {}
      : {
          cursor: "default",
          opacity: "0.4",
        };

  const rightDisabelCarsoulStyle = disableRightCondition
    ? {}
    : {
        cursor: "default",
        opacity: "0.4",
      };

  return (
    <div className="home-landing-page">
      <div className="landing-container">
        <div className="wellcome-message">
          <div>Hello Panda!</div>
          <div className="app-name-words">
            <span className="home-styled-title">Welcome to the  </span>
            <StyledTitle
              middleColor="yellow"
              title={app?.application?.name}
              
            />
          </div>
        </div>
        <div className="carsosel-btns-container">
          <div className="carosel-new-container">
            <div className="scrolling-btn left-scroll-btn ">
              <ChevronLeft
                style={{
                  cursor: "pointer",
                  width: "7rem",
                  height: "7rem",
                  color: "#f4f4f4",
                  ...leftDisabelCarsoulStyle,
                }}
                onClick={handleLeft}
              />
            </div>
            {panels && (
              <div
                className="new-carousel"
                style={{ transform: `translateX(${carouselValue}rem)` }}
              >
                {panels.map((panel) => (
                  <HomePanel panel={panel} all_views={all_views} />
                ))}
              </div>
            )}

            <div className="scrolling-btn right-scroll-btn ">
              <ChevronRight
                style={{
                  cursor: "pointer",
                  width: "7rem",
                  height: "7rem",
                  color: "#f4f4f4",
                  ...rightDisabelCarsoulStyle,
                }}
                onClick={handleRight}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;

//  <div className="home-reports-container">
//         {panels && (
//           <>
//             {panels.map((panel) => (
//               <HomePanel panel={panel} all_views={all_views} />
//             ))}
//           </>
//         )}
//       </div>
