import './App.css'
import ProfilePage from './components/ProfilePage/ProfilePage'
import Login from './Pages/Login/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Register from './Pages/Register/Register';
import MainPage from './Pages/MainPage/MainPage';
import { AddPost } from './Pages/AddPost/AddPost';
import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import Swal from 'sweetalert2'
import { EditPost } from './Pages/EditPost/EditPost';

function App() {
const url=config.url
const [loginState,setLoginState] =useState(false)
const [userId,setUserId] = useState("")  
const [userName,setUserName] = useState("")
const [userPhoto,setUserPhoto] = useState("")
const [userLogin, setUserLogin] = useState({
  username: '',
  password: ''
});
const [editPostId,setEditPostId] = useState("")


const handleChange = (event) => {
  setUserLogin({...userLogin, [event.target.name]: event.target.value})
};

const loginValidation= async() =>{
    const headers = {
      'Content-Type':'application/json'
    }

    const postData = {
      "username": userLogin.username,
      "password": userLogin.password,
    }  
   
    await axios.post(`${url}/users/login`, postData, {headers:headers}).then((res)=>{
    
      setLoginState(true)
      setUserId(res.data.username_id)
      setUserName(res.data.username)
      setUserPhoto(res.data.user_photo)
      
      
    
    }).then(()=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login Success',
        showConfirmButton: false,
        timer: 1500
      })
    }).then(()=>{
      return <Navigate to="/" />;
    })
    .catch((res)=>{
      Swal.fire({
        icon: 'error',
        title: 'Username or Password wrong',
        text: 'Please try again',
        footer: '<a href="">Why do I have this issue?</a>'
      })

    })
};
const setLogout = ()=>{
    setLoginState(false)
    setUserId("")
    setUserName("")
    setUserPhoto("")
}

const handleSubmit = (event) => {
  event.preventDefault();

  // preventDefault ไม่ให้ browser reload
  loginValidation();

}

const updateItem = (id)=>{
  setEditPostId(id)
};

  if(loginState===false){
    return (
      <div className="App">
        <BrowserRouter>
        <div className='nav'>
          <Navbar loginState = {loginState} handleClick = {setLogout}/>
        </div>
          <Routes>
            {/* <Route path = '/nav' element={<Navbar/>}/> */}
           
            <Route path = '/login' element = {<Login onSubmit={handleSubmit} user_login = {userLogin.username} user_password = {userLogin.password} onChange={handleChange} />}/>
            <Route path = '/register' element = {<Register/>}/>
           
            <Route path='*' element = {<Navigate to="/login"/>}/>
          </Routes>

        </BrowserRouter>
        
      
      </div>
    )
  }
  else{
    return (
        <div className="App">
          <BrowserRouter>
          <div className='nav'>
            <Navbar loginState = {loginState}  handleClick = {setLogout}/>
          </div>
            <Routes>
              <Route path = '/' element={<MainPage/>}/>
              <Route path = '/myactivities' element={<ProfilePage userId={userId} updateItem={updateItem}/> } />
              {/* <Route path = '/login' element = {<Login onSubmit={handleSubmit} user_login = {userLogin.username} user_password = {userLogin.password} onChange={handleChange} />}/> */}
              {/* <Route path = '/register' element = {<Register/>}/> */}
              <Route path = '/addpost' element = {<AddPost userId={userId} userName={userName} userPhoto={userPhoto}/>}/>
              <Route path='*' element = {<Navigate to="/"/>}/>

              <Route path='/editpost' element = {<EditPost editPostId = {editPostId} />}/>

            </Routes>

          </BrowserRouter>
          
        
        </div>
      )
  }
}


export default App
