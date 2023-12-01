import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";

const Details = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(    //credits and creditsLoading are variables
        `/${mediaType}/${id}/credits`
    );

    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />   {/*sending data of first vedio and we also need crew data*/}
            <Cast data={credits?.cast} loading={creditsLoading} />
            <VideosSection data={data} loading={loading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} /> z
        </div>
    );
};

export default Details;

/*
useParams is a Client Component hook that lets you read a route's dynamic params 
filled in by the current URL.
*/