/*its a custom hook,which tell us about the state of "loading,data,error" but to get data from url we need to call fetchDataFromApi which is contained by 'api.js' */

//custom hook, whenever we need data we call api
import { useEffect,useState } from "react";
import {fetchDataFromApi} from "../utils/api"

//component, use to get data from api, loading is true while we are fetching data
const useFetch = (url) => {
    const [data,setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error,setError] = useState(null);

    useEffect(()=>{
        setLoading("loading...");
        setData(null);
        setError(null);

        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false) 
                setData(res);
            })
            .catch((err)=>{
                setLoading(false)
                setError("Something went wrong")
            })
    },[url]);    //whenever new url came state will be reset
    return {data,loading,error};
}

export default useFetch;