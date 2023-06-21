import logo from './logo.svg';
import './App.css';
import Register from './pages/register';
import Login  from './pages/login';
import Allorders from './pages/finalord';
import Orders from './pages/orders';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Tod from './pages/tod';

 
import {BrowserRouter,Routes,Route,Redirect, useHistory, Navigate, NavLink} from 'react-router-dom';
import Protected from './protected';
import { PromiseProvider } from 'mongoose';

function App() {


  const [loggedin,setlog]=useState(false);
  
   const [message,setmessage]=useState("");

  const [ credentials,setcred] = useState({name:"hello",password:""});


  function logout(){
    localStorage.removeItem("token");
    window.confirm("successfully logged out");
  }

  function getRegister(rollno,uname,phoneno){

    let data={uname:uname,rollno:rollno,phoneno:phoneno};

   

    

  axios
  .post('http://localhost:3000/register',data)
  .then( (res) => setmessage(res.data))
  .catch(err => {
    console.error(err);
  });

}

useEffect(() => {
  console.log(credentials.name);
},[credentials.name]);



function Logins(rollno,phoneno){

 let checkdetails={rollno:rollno,password:phoneno};



    
   axios
  .post('http://localhost:3000/login',checkdetails)
  .then( (res) => {
    console.log(res.status);
    if(res.status === 200){

      setlog(true);

      localStorage.setItem("token",res.data.token);
       window.location.href="/orders";
    }
    else if(res.status ===201){

       setmessage(res.data);

    }
  })
  .catch(err => {
    console.error(err);
  })
}


  return (
    <div>
      
      <BrowserRouter>
      <div class="topnavbar">
      <NavLink className="navinner"  to="/">Home</NavLink>
      <NavLink className="navinner" to="/allorders">My Orders</NavLink>
      <NavLink className="navinner" to="/orders">Order</NavLink>
      <button style={{backgroundColor:"Transparent",border:"None"}} onClick={logout}>Logout</button>
      </div>
       <Routes>

       
       
     <Route  path="/" element= { <div className="row firstlogin"><p>{message}</p><div className="col-6"><Register
     regist={getRegister}
     /></div>
     <div className="col-6"><Login 
     logit={Logins}
     /></div>
     </div>} />

     
      <Route path="/orders"  element ={<Protected Cmp={Orders} />} />
      


      <Route path="/myorders" element={ <Tod /> } />

      <Route path="/allorders" element={ <Protected Cmp={Allorders} /> }  />
      
    

  
     </Routes>
     </BrowserRouter>
     </div>
     
  );
}

export default App;
