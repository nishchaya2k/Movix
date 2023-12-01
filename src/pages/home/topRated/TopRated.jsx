/*Trending contains three components -> Trending Heading, Switch Tabs, Carousel (card)  */

import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import "../style.scss"
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'


 const TopRated = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const {data,loading} = useFetch(`/${endpoint}/top_rated`);   //using template literals     //how it merge with  base url in api.js, ??


    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };
    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">Top Rated </span>
                <SwitchTabs data =  {["Movies","TV Shows"]} onTabChange = {onTabChange}/>
            </ContentWrapper>
            <Carousel data = {data?.results} loading = {loading} endpoint = {endpoint}/>
        </div>
   )
 }
 
 export default TopRated
 