// we will write axios for writing global method for api call, and then we will use it throughout application
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";  //afer it various endpoints will be added
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTAzNDZiZmNjNjM2ZDkxYmU4YTExZGMxOGFmNzdlOSIsInN1YiI6IjY1NDkzZmQzNmJlYWVhMDBjOWZkNzdkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D09YU6_X-jgJGV7Uzl2hW9NNci2vWXFrYRko11UCFLQ"
// const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;     //token, which is stored in .env

//we will send token to headers, when we call api, there are headers inside it
//so we have stored in the variable
const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

//url and params are the endpoints we will send and according to it data will be fetched
export const fetchDataFromApi = async (url, params) => {
    try {
        //all the response store in data key which we have destructured
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


//time 00:34:55, for url and params
/*
What is an Access Token ? A credential that can be
used by an application to access an API.Access 
Tokens can be either an opaque string or a JSON 
Web Token(JWT).They inform the API that the bearer
of the token has been authorized: to access a
particular service or services.
*/
