import { Link } from 'react-router-dom';
import './Register.scss';
import React, { useState, useEffect } from 'react';
import userImage from '../../images/username.png'
import passwordImage from '../../images/password.png'
import ageImage from '../../images/age.png'
import heightImage from '../../images/height.png'
import weightImage from '../../images/weight.png'
import userphotoImage from '../../images/photo.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import config from '../../../config';
function Register() {
  const url=config.url
  let navigate = useNavigate();
  const [userRegister, setUserRegister] = useState({
    username: '',
    password: '',
    age: '',
    height: '',
    weight: '',
    BMI: '',
  });

  const [postImage, setPostImage] = useState({});

  const [checkingRegisterValidation, setCheckingRegisterValidation] = useState({
    username: '',
    password: '',
    age: '',
    height: '',
    weight: '',
  });

  // checking register validation
  const registerValidation = () => {
    let errors = checkingRegisterValidation;
    // username validation
    const usernameRequired = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";
    if (!userRegister.username.match (usernameRequired)) {
      errors.username = 'Please ingress a valid username';
    } else {
      errors.username = '';
    }

    //password validation
    const conditional = /(?=.*?[0-9])/;
    if (userRegister.password.length < 6) {
      alert ('Password must be longer than 6 characters');
    } else if (!userRegister.password.match(conditional)) {
      errors.password = 'Password must contain at a number';
      alert ('Password must contain at least a number')
    } else {
      errors.password = '';
    }

    //age validation
    if (!userRegister.age.match(conditional)) {
      errors.age = 'Age must contain at a number';
      alert ('Age must contain at a number')
    }

    //height validation
    if (!userRegister.height.match(conditional)) {
      errors.height = 'Height must contain at a number';
      alert ('Height must contain at a number')
    }

    //weight validation
    if (!userRegister.weight.match(conditional)) {
      errors.weight = 'Weight must contain at a number';
      alert ('Weight must contain at a number')
    }
    return setCheckingRegisterValidation(errors)
  };

// BMICalculation
  useEffect(() => {
    const weight = userRegister.weight;
    const height = userRegister.height;
    if (height.length < 1)return;
      var userBmi = weight/((height*height)/10000) ;
      userBmi=userBmi.toFixed(2)
      setUserRegister({
        ...userRegister,
        BMI: userBmi
        })
    },[userRegister.height && userRegister.weight]);

    // const url = "http://localhost:9000/users/register";
    // const createImage = (newImage) => axios.post(url, newImage);
    
    //   const createPost = async (post) => {
    //     try {
    //       await createImage(post);
    //     } catch (error) {
   
    //     }
    //   };
    
      const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
      const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ ...postImage, user_photo: base64 });
      };
    
  const handleChange = (event) => {
    setUserRegister ({...userRegister, [event.target.name]: event.target.value})
  };

  const connentToBackend = async () => {
    const headers = {
      'Content-Type':'application/json'
    }

    const postData = {
      "username": userRegister.username,
      "password": userRegister.password,
      "age": userRegister.age,
      "weight": userRegister.weight,
      "height": userRegister.height,
      "bmi": userRegister.BMI,
      "user_photo": postImage.user_photo
    }  
  
    await axios.post(`${url}/users/register`, postData, {headers:headers}).then((res)=>{

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Register success',
          showConfirmButton: false,
          timer: 1500
        })
        .then(()=>{
          navigate('/login')
        })
 
      }
    ).catch(()=>{
      Swal.fire({
        icon: 'error',
        title: 'Username already',
        text: 'Please try again',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault ();
    await registerValidation ();
    await connentToBackend ();
  };

  return (
    <div className='register'>
      <form onSubmit={handleSubmit}>
        <h1>REGISTER</h1>

        {/* username */}
         <div className='contentRegister'>
          
          <div className='listContentRegister'>
            <img src={userImage}/>
            <input 
              type='text'
              name='username' 
              value={userRegister.username}
              onChange={handleChange}
              placeholder='USERNAME' 
              required/> 
          </div>

          {/* password */}
          <div className='listContentRegister'>
            <img src={passwordImage}/>
            <input 
              type='password' 
              name='password'
              value={userRegister.password}
              onChange={handleChange}
              placeholder='PASSWORD'
              required/>
          </div>

          {/* age */}
          <div className='listContentRegister'>
            <img src={ageImage}/>
            <input 
              type='number' 
              name='age'
              value={userRegister.age}
              onChange={handleChange}
              placeholder='AGE'
              required/>
          </div>

          {/* height */}
          <div className='listContentRegister'>
            <img src={heightImage}/>
            <input 
              type='number' 
              name='height'
              value={userRegister.height}
              onChange={handleChange}
              placeholder='HEIGHT IN cm'
              required/>
          </div>
            
          {/* weight */}
          <div className='listContentRegister'>
            <img src={weightImage}/>
            <input 
              type='number' 
              name='weight'
              value={userRegister.weight}
              onChange={handleChange}
              placeholder='WEIGHT IN kg'
              required/>
          </div>

          {/* userPhoto */}
          <div className='listContentRegister'>
            <img src={userphotoImage}/>
            <input type="file"
            className="inputPhoto" 
            name="user_photo" 
            multiple accept="user_photo/*" 
            onChange={(e) => handleFileUpload(e)}
             />
            {/* <p className="choosePhoto">Choose a photo</p> */}
            {/* {userPhotoURLs.map((imageSrc, index) => (<img width="300" height="300" src={imageSrc} key={index} />))} */}
          </div>
        </div>
          
        <button type='submit'>Create Account</button>
        <div className='underRegister'>
            <h3><Link to='/'><span>Back to login</span></Link></h3>
        </div>
       </form>
    </div>
  )
  }

export default Register
