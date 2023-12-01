import React from "react";
import ReactPlayer from "react-player/youtube";

import "./style.scss";

// const [show, setShow] = useState(false);             //value used like this in the component from where we passed props
// const [videoId, setVideoId] = useState(null);

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);             //we have this in class below, when it is false popup willnot be visible 
        setVideoId(null);
    };
    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}          //for showing vedio, where 'v' in url is watch
                    controls            //we have unable the controls, means we can play and pause the video
                    width="100%"
                    height="100%"
                    // playing={true}       //playing true means it will autoplay
                />
            </div>
        </div>
    );
};

export default VideoPopup;