import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {       
      window.scrollTo(0, 0);
    }, [location]);       //whenever location changes, make sure make sure page start from top

    const controlNavbar = () => {
      if (window.scrollY > 200) {                                 //window.scroll is property which calculate scroll value
          if (window.scrollY > lastScrollY && !mobileMenu) {      //when we scroll downside window.scrollY might '==' or 'less then' lastScrollY
              setShow("hide");
          } else {
              setShow("show");
          }
      } else {
          setShow("top");
      }
      setLastScrollY(window.scrollY);
    };

    //whenever u add any event in reactjs, it is the best practice that should remove it also otherwise u can face memory issue
    useEffect(() => {
      window.addEventListener("scroll", controlNavbar);  //scroll is event and controlNavbar is method
      return () => {
          window.removeEventListener("scroll", controlNavbar);
      };
    }, [lastScrollY]);      //whenever we scroll useEffect activated

    const searchQueryHandler = (event) => {
      if (event.key === "Enter" && query.length > 0) {
          navigate(`/search/${query}`); 
          setTimeout(() => {  //when we redirect to another page we need to close searchBar after 1 sec (assume)
              setShowSearch(false);
          }, 1000);
      }
    };

    const openSearch = () => {
      setMobileMenu(false);
      setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const navigationHandler = (type) => {
      if (type === "movie") {
          navigate("/explore/movie");
      } else {
          navigate("/explore/tv");
      }
      setMobileMenu(false);       //after navigate close the MobileMenu
    };

    return <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        {/* image logo */}
        <div className="logo">
          <img src={logo} alt="" />
        </div>

        {/* list */}
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>TV Shows</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch}/>
          </li>
        </ul>

        {/* for mobile UI */}
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />{/*we need search bar after we click in searchButton */}
          {mobileMenu ? (
              <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
              <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {/* component render when we click on searchBarand showSearch need to be true */}
      {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
    </header>
}

export default Header;