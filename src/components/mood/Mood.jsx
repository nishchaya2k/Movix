// import React, { useState } from 'react'
// import { VscChromeClose } from "react-icons/vsc";
// import "./style.scss"
// import Img from '../lazyLoadImage/Img';
// import Sleep from "./images/Sleep.png"
// import Angry from "./images/Angry.png"
// import Loved from "./images/Loved.png"
// import Sad from "./images/Sad.png"
// import Happy from "./images/Happy.png"


// const Mood = (props) => {

//     const [showMood,setShowMood] = useState(true)
//     // const [text,setText] = useState("");

//     const attach = ((p) => console.log(p));

//     return (
//         <div>
//         {showMood && <div className='mood'>
            
//             <VscChromeClose onClick={()=>setShowMood(false)}/>

//             <div className='categoryImage'>
//                 <div className='imagesDiv' >
//                     <Img src= {Sleep} alt="" className='moodImage' onClick={attach("Comedy")} />
//                 </div>
//                 <div className='centerImages'> 
//                     <div className='imagesDiv'>
//                         <Img src={Angry} className='moodImage'/>
//                     </div>

//                     <div className='imagesDiv'>
//                     <Img src={Loved} className='moodImage'/>
//                     </div>
                    
//                     <div className='imagesDiv'>
//                         <Img src={Happy} className='moodImage'/>
//                     </div>
//                 </div>
//                 <div className='imagesDiv'>
//                         <Img src={Sad} className='moodImage'/>
//                 </div>
//             </div>
//         </div>}
//         </div>
//     //   "../../assets/no-poster.png"
//     )
// }

// export default Mood




import React, { useState } from 'react'
import { VscChromeClose } from "react-icons/vsc";
import "./style.scss"
import Img from '../lazyLoadImage/Img';
import Sleep from "./images/Sleep.png"
import Angry from "./images/Angry.png"
import Loved from "./images/Loved.png"
import Sad from "./images/Sad.png"
import Happy from "./images/Happy.png"
import { FaAnglesRight } from "react-icons/fa6";


const Mood = (props) => {

    const [showMood,setShowMood] = useState(true)
    // const [text,setText] = useState("");

    const attach = ((p) => console.log(p));

    return (
        <div>
        {showMood && <div className='mood'>
            
            {/* <VscChromeClose/> */}

            <div className='categoryImage'>
                <div className='imagesDiv' >
                    <Img src= {Sleep} alt="" className='moodImage' onClick={attach("Comedy")} />
                </div>
                <div className='centerImages'> 
                    <div className='imagesDiv'>
                        <Img src={Angry} className='moodImage'/>
                    </div>

                    <div className='imagesDiv'>
                    <Img src={Loved} className='moodImage'/>
                    </div>
                    
                    <div className='imagesDiv'>
                        <Img src={Happy} className='moodImage'/>
                    </div>
                </div>
                <div className='imagesDiv'>
                        <Img src={Sad} className='moodImage'/>
                </div>
            </div>
            <div className='skip'>
                <span onClick={()=>setShowMood(false)}>
                    skip 
                    <span className='rightShift'><FaAnglesRight/></span>
                </span>
            </div>
        </div>}
        </div>
    //   "../../assets/no-poster.png"
    )
}

export default Mood
{/* <div className='categoryImage'>
    <select>
        <option><div className='imagesDiv'><Img src={Angry} className='moodImage'/></div></option>
        <option><div className='imagesDiv'><Img src={Sleep} className='moodImage'/></div></option>
        <option>
            <div className='centerImages'>
                <option><div className='imagesDiv'><Img src={Happy} className='moodImage'/></div></option>
                <option><div className='imagesDiv'><Img src={Loved} className='moodImage'/></div></option>
                <option><div className='imagesDiv'><Img src={Sad} className='moodImage'/></div></option>
            </div>
        </option>
    </select>
</div> */}