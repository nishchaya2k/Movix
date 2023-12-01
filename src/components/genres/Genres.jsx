import React from 'react'
import { useSelector } from 'react-redux'
import "./style.scss"

const  Genres = ({data}) => {       //we have received the ids
    const {genres} = useSelector((state) => state.home);

  return (
    <div className='genres'>
        {data?.map((g) => {{        /* for each id, we will print its respective name which we have stored in array in "app.js" */}
            if(!genres[g]?.name) return;
            return (
                <div key = {g} className="genre">
                    {genres[g]?.name}
                </div>
            )
        })}      
    </div>
  )
}; 

export default  Genres;
