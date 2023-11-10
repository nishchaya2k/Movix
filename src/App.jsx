import { useState,useEffect } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {fetchDataFromApi} from "./utils/api"
//method we need to destructure

import { useSelector,useDispatch } from 'react-redux';
import { getApiConfiguration } from './store/homeSlice';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

// getApiConfiguration
function App() {

    const {url} = useSelector((state) => state.home)
    const dispatch = useDispatch()

    useEffect(() => {
      fetchApiConfig();
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
    
    return (
      <BrowserRouter>
          <Header/>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/:mediaType/:id" element={<Details />} />
              <Route path="/search/:query" element={<SearchResult />} />
              <Route path="/explore/:mediaType" element={<Explore />} />
              <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    )
      
}
 
export default App



// return (<div className='App'>
//         App
//         {url?.total_pages} 
//         {/* sometime url is undefined bcoz of time taken from api call, so avoid app break we use '?' (optional chaining) */}
//       </div>
// )