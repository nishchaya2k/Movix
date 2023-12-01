import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {

  const {url} = useSelector((state) => state.home)
    const dispatch = useDispatch()

    useEffect(() => {
      fetchApiConfig();
      genresCall();
    }, []);

    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration").then((res) => {  //we get response (res) if api call is successful and in .then() we write callback function which have response
            console.log(res);

            const url = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            };

            dispatch(getApiConfiguration(url));
        });
    };

    //promises used, when u have multiple api call
    const genresCall = async() => {
      let promises = [];
      let endPoints = ["tv","movie"];
      let allGenres = {};

      endPoints.forEach((url) => {  //url is iterator, accessing values of endpoints array
        promises.push(fetchDataFromApi(`/genre/${url}/list`));    //pushing in promises the response of all api calls,( means no. of api calls = no. of values in endpoints array)
      });

      //  promises.all make sure to get all api responses before moving forward
      const data = await Promise.all(promises);

      console.log(data);

      data.map(({genres}) => {                //genres is iterator, which contains all no. of api calls data, like in this project -> data of "tv" & "movie"
        return genres.map((item) => (allGenres[item.id] = item)); //storing data acc. of "tv and movie" in single array
      })
      console.log(allGenres)
      
      dispatch(getGenres(allGenres));
    }
  return (
    <div>
        <BrowserRouter>
          <Header/>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/:mediaType/:id" element={<Details />} />
              <Route path="/search/:query" element={<SearchResult />} />
              <Route path="/explore/:mediaType" element={<Explore />} />
              <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
    </div>
  )
}

export default App
