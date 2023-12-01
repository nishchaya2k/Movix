import React, {useState,useEffect} from 'react'
import "./style.scss";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import Img from "../../../components/lazyLoadImage/Img"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"

const HeroBanner = () => {
    const [background,setBackground] = useState("")
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const {url} = useSelector((state) => state.home)
    const {data,loading} = useFetch("/movie/upcoming");

    useEffect(()=>{
        const bg = url.backdrop
         + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;   //we need 3 things to build image url so we have (backdrop contains 2 and filepath)                //there is a key called results in the data(object) and ? is optional chaining
        setBackground(bg);
    },[data])
    
    //whatever we write in input it needs to be store in the query
    const searchQueryHandler = (event) => {     //handling the input field and then append the url via navigate so that we can fetch information acc. to updated url
        let id = event.target.id;
        if (event.key === "Enter" && query.length > 0 ) {
            navigate(`/search/${query}`);
        }

        else if(id=== "1"){
            navigate(`/search/${query}`);
        }
    };
 

  return (
    <div className="heroBanner">
        {!loading && (<div className="backdrop-img">
            <Img src = {background}/>
        </div>)}


       <div className="opacity-layer"></div>
       <ContentWrapper>
            <div className='heroBannerContent'>
                <span className ="title">Welcome</span>
                <span className ="subTitle">
                    Millions of movies, TV shoes and people
                    to discove.
                    Explore now.
                </span>
                <div className="searchInput">
                    <input
                        type="text"
                        placeholder="Search for a movie or tv show...."
                        onChange={(e) => setQuery(e.target.value)}  //updated the query
                        onKeyUp={searchQueryHandler}
                    />
                    <button onClick={searchQueryHandler} id={'1'}>Search</button>
                </div>
            </div>
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner


/*
The event object is passed in by default to callback functions in JavaScript 
because it provides information about the event that triggered the callback. 
This information can be useful for debugging or for taking specific actions 
based on the type of event.

For example, if you have a callback function that is triggered when a button
is clicked, the event object will contain information about the button that
was clicked, such as its ID, its text, and its position on the screen. This 
information can be used to take specific actions based on the button that was 
clicked.
*/



/*
 you can't directly use image url from api data, u need to store the paths of baseUrl 
 to build image url u need 3 pieces of data, base_url,size and file_path, we have file path
 which we have stored in the background state, now we need rest of 2 things, 
*/