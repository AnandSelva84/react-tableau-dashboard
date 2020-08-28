import React from "react";
import "../loading/laoding.css";
import { useEffect, useState } from "react";
import "./index.css";
const NoData = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {loaded && (
        <div className="loading">
          <div className="no-data-view">
            <article>
              <h1>We&rsquo;ll be back soon!</h1>
              <div>
                <p>
                  Sorry for the inconvenience but we&rsquo;re performing some
                  maintenance at the moment. If you need to you can always{" "}
                  <a href="mailto:#">contact us</a>, otherwise we&rsquo;ll be
                  back online shortly!
                </p>
                <p>&mdash; The Team</p>
              </div>
            </article>
          </div>
        </div>
      )}
    </>
  );
};

export default NoData;
