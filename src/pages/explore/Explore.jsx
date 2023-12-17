import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import "./style.scss";

import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import Mood from "../../components/mood/Mood";

let filters = {}; //object,   in which we assign a key name 'with_genres'(array) where 
//we store id's of all selected items (from 'Select genres' or 'Sort by') & then
//send it to endpoint to get the data

const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" }, //after clicking on the label we send value on the endpoint
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const { mediaType } = useParams();

    const { data: genresData } = useFetch(`/genre/${mediaType}/list`); //Geners Api, we are listing the movie card basis on geners
    //we need the 'data' from the api we have called
    // & we have destructered it in 'data' and use the object genresData to store

    const [showMood, setShowMood] = useState();

    // useEffect(() => {
    // setShowMood(false);    //we need to reset it to use the value when mediaType change
    // setTimeout(() => {
    //     console.log("hey")
    //     setShowMood(true);
    // }, 200000);
    // }, [mediaType]);
  
    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(
            `/discover/${mediaType}?page=${pageNum}`,
            filters
        ).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
    };

    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData();
    }, [mediaType]);

    const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
        setSortby(selectedItems);
        if (action.action !== "clear") {
            filters.sort_by = selectedItems.value; //filters is object declared on the top & sort_by(array declared & initialize here) is a key
        } else {
            delete filters.sort_by;
        }
    }

    if (action.name === "genres") {
        setGenre(selectedItems);
        if (action.action !== "clear") {
            let genreId = selectedItems.map((g) => g.id); //array form
            genreId = JSON.stringify(genreId).slice(1, -1); //remove the [] for to send to endpoints
            filters.with_genres = genreId;  //filters is object declared on the top & with_genres is a key
        } else {
            delete filters.with_genres; 
        }
    }

        setPageNum(1);
        fetchInitialData();
    };

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader" >
                    <div className="pageTitle">
                        {mediaType === "tv"
                            ? "Explore TV Shows"
                            : "Explore Movies"}
                    </div>

                    {/* DropDown Menu for geners and to do sort */}
                    <div className="filters">
                        
                        <Select
                            isMulti
                            name="genres"
                            value={genre}  //value is assigned when onChange method called, what is its use?
                            closeMenuOnSelect={false}
                            options={genresData?.genres} //genresData (object) contain array named as 'genres'
                            getOptionLabel={(option) => option.name} //use to show all the option names in the dropdown
                            getOptionValue={(option) => option.id} //after select 1 option 'Dropdown list shows no option' and it prevents it
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
            {/* {showMood && <Mood/>} */}
                
           
        </div>
    );
};

export default Explore;

