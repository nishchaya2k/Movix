import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show,setShow] = useState("top");               //for scroll effect
  const [lastScrollY,setLastScrollY] = useState(0);     //
  const [mobileMenu,setMobileMenu] = useState(false);   //for sidebar
  const [query,setQuery] = useState("");                //for to text
  const [showSearch,setShowSearch] = useState("")       //
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);     //when location changes , scroll should  start from top

  const controlNavbar = () => {
    if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY && !mobileMenu) {
            setShow("hide");
        } else {                                        //when we scroll in downside means we are going up, navbar bacome dark untill > 200 and lessthan lastScrollY
            setShow("show");
        }
    } else {
        setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() =>{
    window.addEventListener("scroll",controlNavbar)
    return () => {
      window.removeEventListener("scroll",controlNavbar)      //to prevent memory leakage issue, we will remove the eventlistener
    };
  },[lastScrollY])

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
        navigate(`/search/${query}`);
        setTimeout(() => {
            setShowSearch(false);
        }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
  }

  const openMobileMenu= () => {
    setMobileMenu(true)
    setShowSearch(false)
  }

  const navigationHandler = (type) => {
    if(type === "movie"){
      navigate("/explore/tv")
    }
    else{
      navigate("/explore/tv");
    }
    setMobileMenu(false);   //in mobile mode, side bar is remained open after we clicked on any of option so we need to close it also
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView":""} ${show}`}>  {/* if mobileMenu is activated means we have clicked sideBar, then css will be displayed acc. to it */}
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src = {logo} alt = ""/>
        </div>
        {/* for large screen */}
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
              Movies</li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
              TV Shows</li>         
          <li className="menuItem"><HiOutlineSearch onClick={openSearch}/></li>
        </ul>

        {/* for small screen */}
        <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch}/>
            {mobileMenu ?
             (<VscChromeClose onClick={()=>setMobileMenu(false)}/>):
             (<SlMenu onClick={openMobileMenu}/>)}  { /*we have open the sidebar  */}

        </div>
      </ContentWrapper>

      {showSearch && (<div className="searchBar">
        <ContentWrapper>
          <div className ="searchInput">
                    <input
                        type="text"
                        placeholder='Search for a movie or tv show....'
                        onChange={(e) => setQuery(e.target.value )} //using callback method we will update query
                        onKeyUp={searchQueryHandler}
                    />
                    <VscChromeClose onClick={()=>setShowSearch(false)}/>
          </div>
        </ContentWrapper>
      </div>)}
    </header>
  )
}

export default Header
