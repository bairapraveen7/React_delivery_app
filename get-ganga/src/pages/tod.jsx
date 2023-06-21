import { useState } from "react";
import  axios  from "axios";
import React from "react";
import { Checkmark } from "react-checkmark";

 
import { useEffect } from "react";

const gettoday= async(headers) => {
 
  return await axios.post('http://localhost:3000/gettodorders',null,headers)
   .then((res) => res.data)
   .catch((err) => {
     console.log(err);
   });
 }

let currentTime=new Date();
  var currentOffset = currentTime.getTimezoneOffset(); 
  
   var ISTOffset = 330 
  
   var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
  
  var day = ISTTime.getDay();
  
   var hoursIST = ISTTime.getHours(); 
  var minutesIST = ISTTime.getMinutes() ;

function Tod(){

 const [orders,setord] = useState([]);

   

  const [iford,setiford] = useState(true);

  let take=localStorage.getItem("token");

  var headers={
    withCredentials:true,
    headers :{'Authorization':'Bearer '+take}
  }

   
    // useEffect(() => {

    //   gettoday(headers).then((res) => {setord(res.allorders);setiford(true)});


    // },[orders]);

    

  
    

   const state={one:false,two:false,three:false,four:false};
  

  if(day!==0){ 

     if(hoursIST<18) {

      state.one=true;
    
    
    
    } else { 

      state.two=true;
      
      
       } 
    
      }
      else{ 
    
    if(hoursIST<20) { 
    
       if((minutesIST<30 && hoursIST === 19) || hoursIST<19) { 

       state.three=true;
        
    
     } 
    
      else {

         state.four=true;
      
      } 
    
      } 
    
       } 

       let data=localStorage.getItem("data");

    return (
      <>
       <div className="App">
      <Checkmark size={"120"} />
    </div>
    <div>

    </div>
  
        <div class="finalhead">
          <h2 className="orderR">ORDER RECIEVED</h2>
<h2  class="h22">Thank you for placing the order</h2>

{state.one && <h2 class="h22">You will recieve your order by 6:45pm.</h2>}

{state.two && <h2 class="h22">You will recieve your order by 6:45pm Tomorrow.</h2>}

{state.three && <h2 class="h22">You will recieve your order by 8:15pm.</h2>}
 
 {state.four && <h2 class="h22">You will recieve your order by 6:45pm Tomorrow.</h2>}


  <div class="addd">
<table class="table">
<thead>
    <tr>
      <th scope="col">S.no</th>
      <th scope="col">Item</th>
      <th scope="col">Quantity</th>
      <th scope="col">max cost</th>
    </tr>
  </thead>
  <tbody>

 {iford && orders.map((eachitem) =>

        <tr class="trr">
        <th scope="row"></th>
        <td style={{color:"black"}}>{eachitem.item}</td>
        <td style={{color:"black"}}>{eachitem.quantity}</td>
        <td style={{color:"black"}}>{eachitem.maxprice}</td>
        </tr>
 
 )}
                 
       
  </tbody>
</table>
</div>

 
  <div>

    <div class="copyright">
      {/* <i class="fa-brands fa-gg-circle fa-7x" style={{color:"wheat"}}></i> */}
      <p class="contact">For Delivery Instructions Contact</p>
      <p class="contact"> Whatsapp: <phone>9652797340</phone></p>
      <p class="contact">From Your Registered Mobile</p>
    </div>

    </div>
    
    </div>
    </>


    )
}

export default Tod;