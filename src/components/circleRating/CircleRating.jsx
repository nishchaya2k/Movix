import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; //react library
import "react-circular-progressbar/dist/styles.css";    //css file from above library

import "./style.scss";

const CircleRating = ({ rating }) => {
    return (
        <div className="circleRating">
            <CircularProgressbar                //in this component we will send value..etc,
                value={rating}
                maxValue={10}                   //by default it will count rating from 100
                text={rating}
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    );
};

export default CircleRating;