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

const HomePage = (props) => {
  const { app, panels = [] } = useData().sharedReducer;
  const { all_views = [] } = app;
  const [carouselValue, setCarouselValue] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!app) dispatch(setCurrentLocation(app?.subject_area[0]?.name));
  }, []);

  const handleRight = () => {
    setCarouselValue(carouselValue - 10);
  };

  const handleLeft = () => {
    if (carouselValue !== 0) setCarouselValue(carouselValue + 10);
  };

  return (
    <div className="home-landing-page">
      <div className="landing-container">
        <div className="wellcome-message">
          <div>Hello Timothy!</div>

          <div className="app-name-words">
            <span>Wellcome to the</span>
            <StyledTitle
              middleColor="yellow"
              title={app?.application?.name}
              className="home-styled-title"
            />
          </div>
          {panels && (
            <div className="panles-container">
              <div className="triangle right-scroll-btn ">
                <ChevronRight
                  style={{ cursor: "pointer", width: "7rem", height: "7rem" }}
                  onClick={handleRight}
                />
              </div>

              <div className="triangle left-scroll-btn ">
                <ChevronLeft
                  style={{ cursor: "pointer", width: "7rem", height: "7rem" }}
                  onClick={handleLeft}
                />
              </div>
              <div className="carousel-container">
                <div
                  className="carousel"
                  style={{ transform: `translateX(${carouselValue}rem)` }}
                >
                  {panels.map((panel) => (
                    <HomePanel panel={panel} all_views={all_views} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
