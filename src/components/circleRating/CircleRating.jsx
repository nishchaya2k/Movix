import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";  //library
import "react-circular-progressbar/dist/styles.css";        //css file getting from above library

import "./style.scss";

const CircleRating = ({ rating }) => {
    return (
        <div className="circleRating">
            <CircularProgressbar            //parameters taken by component
                value={rating}
                maxValue={10}               //maximum value from which we will calculate rating, by default it is 100
                text={rating}               //value which we show on screen
                styles={buildStyles({       //circular color shown at boundary, basis on rating data
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    );
};

export default CircleRating;