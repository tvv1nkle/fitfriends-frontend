import React from "react";
import './Navbar.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
function Navbar(props) {
    let navigate = useNavigate();
    const [tabMobile, setTabMobile] = useState(false)
    const [showNavbar, setShowNavbar] = useState(true)

    
    const showLogin = !(props.loginState)
 
    const handleClick = () => {
        setshowLogin(!showLogin)
    }

    const toggleMobile = () => {
        setTabMobile(!tabMobile)
    }
    const setNavBar = () => {

        if (window.scrollY >= 200) {
            setShowNavbar(false)
        } else {
            setShowNavbar(true)
        }
    }

    window.addEventListener('scroll', setNavBar)
    return (
        <div className={showNavbar ? 'Nav-content' : 'Nav-content hide'}>
            <div className="Nav-content1">
                <div className="logo">
                    <a href="#home"><img src="/images/logo-removebg-preview.png" /></a>
                </div>
            </div>
            <div className="ul">
                <ul className="Nav-ul">
                    <li><Link style={{textDecoration: 'none',color:"white"}} to = {"/"}>Community</Link></li>
                    <li><Link style={{textDecoration: 'none',color:"white"}} to = {"/addpost"}>Add Post</Link></li>
                    <li><Link style={{textDecoration: 'none',color:"white"}} to = {"/myactivities"}>My Activities</Link></li>

                </ul>
            </div>
            <div className="login-name">
                {showLogin ? (<div><Link to = {"/login"}><button><a id='#' className="sign-in"><i className="fa-solid fa-right-to-bracket"></i>Sign in</a></button></Link>
                    <Link to = {"/register"}><button><a id='#' className="sign-up"><i className="fa-solid fa-user-plus"></i>Sign up</a></button></Link></div>) :
                    <div className="Show__login__complete">
                    <div >
                  
                    </div>
                    <button onClick={props.handleClick}>Log out </button></div>}
            </div>
            {/* Mobile */}
            <div className="nav-mobile">
                <div className="toggle-bar">
                    <i className="fa-solid fa-bars" onClick={toggleMobile}></i>
                </div>
                <div className={tabMobile ? "tab-mobile active" : "tab-mobile"}>
                    <div className="container-mobile">
                        <div className="mobile-login-name">

                            {showLogin ?
                                (
                                    <div>
                                        <div >
                                            <Link to ={'/login'}><button onClick={() => {
                                                toggleMobile();
                                                setshowLogin(false)
                                            }}><i className="fa-solid fa-right-to-bracket"></i><a id='#' className="sign-in">Sign in</a>
                                            </button></Link>
                                        </div>
                                        <div>
                                            <Link to = {'/register'}><button onClick={toggleMobile}><i className="fa-solid fa-user-plus"></i><a id='#' className="sign-up">Sign up</a>
                                            </button></Link>
                                        </div>
                                    </div>
                                ) :
                                <div className="">
                                    <div>
                                        {/* <Login /> */}
                                    </div>
                                    <div style={{ marginTop: 8, marginBottom: 5 }}>
                                        {/* <Login_user color="white" /> */}
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <button onClick={props.handleClick}>Log out </button>
                                    </div>
                                </div>}
                        </div>
                        <div className="mobile-ul">
                            <ul className="mobile-nav-ul">
                                <li onClick={toggleMobile}><Link style={{textDecoration: 'none',color:"white"}} to = {"/"}>Community</Link></li>
                                <li onClick={toggleMobile}><Link style={{textDecoration: 'none',color:"white"}} to = {"/addpost"}>Add Post</Link></li>
                                <li onClick={toggleMobile}><Link style={{textDecoration: 'none',color:"white"}} to = {"/myactivities"}>My Activities</Link></li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       

    )
};


export default Navbar