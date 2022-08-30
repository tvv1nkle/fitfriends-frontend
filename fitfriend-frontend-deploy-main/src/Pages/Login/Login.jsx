import './Login.scss';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import userImage from '../../images/username.png'
import passwordImage from '../../images/password.png'


function Login(props) {
  // const [userLogin, setUserLogin] = useState({
  //   username: '',
  //   password: ''
  // });

  // const users = [
  //   {
  //     username: 'admin',
  //     password: '123456'
  //   },
  // ];

  // const handleChange = (event) => {
  //   setUserLogin({...userLogin, [event.target.name]: event.target.value})
  // };

  // const loginValidation = () => {
  //   const loginCheck = users.find(user => (user.username === userLogin.username && user.password === userLogin.password));
  //   if(loginCheck) {
  //     alert('Login Successfully')
  //   } else {
  //     alert('invalid password or username')

  //   }
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // preventDefault ไม่ให้ browser reload
  //   loginValidation();
  // };


  return (
    <div className='login'>
      <form onSubmit={props.onSubmit}>
      <h1>LOG IN</h1>
       <div className='contentLogin'>
         <div className='listContentLogin'>
           <img src={userImage}/>
           <input 
             type='text'
             name='username' 
             value={props.user_login}
             onChange={props.onChange}
             placeholder='USERNAME' 
             required/> 
         </div>
         <div className='listContentLogin'>
           <img src={passwordImage}/>
           <input 
            type='password' 
            name='password'
            value={props.user_password}
            onChange={props.onChange}
            placeholder='PASSWORD'
            required/>
            {/* placeholder คือ ตำที่จะแสดงภายในกล่องข้อความ */}
            {/* required คือต้องใส่ ไม่ใส่ไม่ได้และจะต้องถูกต้องตามรูปแบบของอีเมลที่กำหนด */}
         </div>
         </div>

        <button type='submit'>SIGN IN</button>

        <div className='underButton'>
          <h3><Link to='/MainPage'><span>May be Later</span></Link></h3>
          <h3><Link to='/Register'><span>Register</span></Link></h3>
        </div>
       </form>
    </div>
  );
}

export default Login
