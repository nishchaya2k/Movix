import React, { useState } from 'react'
import "./style.scss"

const SwitchTabs = ({data,onTabChange}) => {

    const [selectedTab, setSelectedTab] = useState(0);
    const [left,setLeft] = useState(0);

    const activeTab = (tab,index) => {
        setLeft(index * 100)            //that selected tab bg color, will calculated from left, and here we are deciding the distance at which we need the bg color acc. to index 
        setTimeout(() => {
            setSelectedTab(index)       //we will update after some time
        },300);
        onTabChange(tab,index)
    }

  return (
    <div className='switchingTabs'>
        <div className="tabItems">
            {data.map((tab,index) => (          //data =  {["Day","Week"]}, sent by other component
                <span key = {index}
                    className={`tabItem ${selectedTab === index ? "active":""}`} 
                    onClick={()=>activeTab(tab,index)}>
                    {tab}
                </span>
            ))}
            <span className='movingBg' style = {{left}}/>
        </div>
    </div>
  )
}

export default SwitchTabs
