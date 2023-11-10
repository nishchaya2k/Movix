import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");     //to mainting background state, becoz everytime page reload background image changes
    const [query, setQuery] = useState("");             //handling the input data in in input field
    const navigate = useNavigate();      //created the instance of useNavigate method

    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/movie/upcoming");  //destructure the 'data and loading' from useFetch method, and in it we will out endpoints(for getting particular data by api calling)

    useEffect(() => {
        const bg =
            url.backdrop +  //backdrop give url of background image with original size
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;  //use optional chaining '?' to avoid app break, 
        setBackground(bg);
    }, [data]);

    const searchQueryHandler = (event) => {     //handling the input field and then append the url via navigate so that we can fetch information acc. to updated url
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}  //updated the query
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;

/*
In order to generate a fully working image URL, you'll need 3 pieces of data.
Those pieces are a base_url, a file_size and a file_path.

The first two pieces can be retrieved by calling the /configuration API and the 
third is the file path you're wishing to grab on a particular media object.
*/

/*
https://developer.themoviedb.org/docs/image-basics
*/