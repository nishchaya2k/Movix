/* fetching data from api */
/* here, we have use the api of imbd, which is movie app */


// we will write axios for writing global method for api call, and then we will use it throughout application
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";  //afer it various endpoints will be added
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTAzNDZiZmNjNjM2ZDkxYmU4YTExZGMxOGFmNzdlOSIsInN1YiI6IjY1NDkzZmQzNmJlYWVhMDBjOWZkNzdkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D09YU6_X-jgJGV7Uzl2hW9NNci2vWXFrYRko11UCFLQ"
// const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;     //token, which is stored in .env but here we have use the token directly without creating .env file

//we will send token to headers, when we call api, there are headers inside it
//so we have stored in the variable
const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

//url and params are the endpoints we will send and according to it data will be fetched
export const fetchDataFromApi = async (url, params) => {
    try {
        //all the response we got from axios.get we will receive it in data key and then we destructure it
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};



//Asynchronous programming enables programs to start a potentially long-running task and still be able to be responsive to other events while that task runs.
//url is endpoint and params are like we want to pass some extra params in url so as a second argument we will pass it we will send and according to it data will be fetched
//API Parameters are options that can be passed with the endpoint to influence the response