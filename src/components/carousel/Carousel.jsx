import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import useFetch from "../../hooks/useFetch";
import dayjs from "dayjs";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading, endpoint, title }) => {

    const carouselContainer = useRef();
    const {url} = useSelector((state)=>state.home);
    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) :  //The HTMLElement.offsetWidth read-only property returns the layout width of an element as an integer + 20 is apprx value of padding and margin
                                              container.scrollLeft + (container.offsetWidth + 20)   
        container.scrollTo({
            left: scrollAmount,  //Specifies the number of pixels along the X axis to scroll the window or element.
            behavior: "smooth",  //Determines whether scrolling is instant or animates smoothly
        });
     }       

    // skeleton, when page is loading
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };
    
    return (
        <div className="carousel">
        <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick = {() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick = {() => navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems" ref = {carouselContainer} >
                                       
                        {data?.map((item)=>{
                            const posterUrl = item.poster_path ?
                                              url.poster + item.poster_path:            //we need three things to build image url, go to app.js file
                                              PosterFallback
                            return (  
                                <div key = {item.id} className="carouselItem" onClick={() => navigate(`/${item.media_type || endpoint}/${ item.id }`)}>
                                    <div className="posterBlock">
                                        <Img src={posterUrl}/>
                                        <CircleRating rating={item.vote_average.toFixed(1)}/>
                                        <Genres data = {item.genre_ids.slice(0,2 )}/>
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name} 
                                        </span>
                                        <span className="date">
                                             {
                                                dayjs(item.release_Date).format("MMM D, YYYY")
                                             }            
                                        </span>

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ):( 
                    <div className="loadingSkeleton">
                    {/* when page is loading, we will call this method many times */}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
        </ContentWrapper>
        </div>
    )
}

export default Carousel
