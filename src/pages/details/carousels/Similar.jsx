import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <div>
            {  (data?.results?.length)  && 
            <Carousel
                title={title}
                data={data?.results}
                loading={loading}
                endpoint={mediaType}
            />}
        </div>
            
    );
};

export default Similar;