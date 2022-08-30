import React from "react";
import "./ProfilePage.css"
import { useState,useEffect } from "react";
import MyActivites from "../MyActivites/MyActivities";
import NavbarMockup from "../NavbarMockup/NavbarMockup";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import config from "../../../config";
const ProfilePage= (props) =>{
    const url=config.url
    const [profileData,setProfileData] = useState([])
    const userIdLogin = props.userId
    useEffect(() => {

        axios.get(`${url}/users/${userIdLogin}/information`)
        
        .then((res) => { setProfileData(res.data)})
      
    }
    
        , [])
    const updateItem=(id)=>{
      
        props.updateItem(id)
    }
    return(
        <div>
           <div className="navbar">
                {/* <Navbar/> */}
           </div>
            <div className="box-profile-page">
                <div className="user-profile">
                    <div className="profile-picture">
                        <img src={profileData.user_photo} 
                        alt="profile-picture"/>
                    </div>
                    <div className="profile-detail">
                        <h2>Name : <span>{profileData.username}</span></h2>
                        <h2>Age : <span>{profileData.age}</span></h2>
                        <h2>Height : <span>{profileData.height} cm</span></h2>
                        <h2>Weight : <span>{profileData.weight} kg</span></h2>
                        <h2>BMI : <span>{profileData.bmi}</span></h2>
                    </div>
                    
                </div>
                <div className="my-activity">
                 
                    <MyActivites userId={userIdLogin} updateItem = {updateItem}/>
                </div>

            </div>
        </div>
    )
}
export default ProfilePage