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

const HomePage = (props) => {
  const { app, panels = [] } = useData().sharedReducer;
  const { all_views = [] } = app;
  const [carouselValue, setCarouselValue] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!app) dispatch(setCurrentLocation(app?.subject_area[0]?.name));
  }, []);

  const handleRight = () => {
    setCarouselValue(carouselValue + 10);
  };

  const handleLeft = () => {
    setCarouselValue(carouselValue - 10);
  };

  return (
    <div className="home-landing-page">
      <div className="landing-container">
        <div className="wellcome-message">
          <div>Hello Timothy!</div>
          <button onClick={handleRight}>right</button>
          <button onClick={handleLeft}>left</button>
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
              <div
                className="carousel"
                style={{ transform: `translateX(${carouselValue}rem)` }}
              >
                {panels.map((panel) => (
                  <HomePanel panel={panel} all_views={all_views} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
