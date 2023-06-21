import Smoking from "../Smoking";
import Stationary from "../stationary";
import Grocery from "../grocery";
import Fooditems from "../fooditems";
import Entry from "../Entry";
import Empty from "./emptytable";
import Predeftable from "./predefined";
import { useState } from "react";
import Lastinfo from "./lastinfo";
import { PromiseProvider } from "mongoose";
import axios from "axios";
import { data } from "jquery";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const authenticate= async(headers) => {
 
 return await axios.post('http://localhost:3000/checktoken',null,headers).
  then((res) => res.data)
  .catch((err) => {
    console.log(err);
  });
}

function Orders(props){

  let take=localStorage.getItem("token");

  const [name,setname]=useState("");

  let navigate = useNavigate();


  var headers={
    withCredentials:true,
    headers :{'Authorization':'Bearer '+take}
  }

  useEffect(() => {

    authenticate(headers).then((res) => {setname(res)})

  },[]);

  const [empty,setempty]=useState(false);

   

  function senddata(){

    let take=localStorage.getItem("token");

    console.log(take);

  

  var headers={
    withCredentials:true,
    headers :{'Authorization':'Bearer '+take}
  }

    axios.post('http://localhost:3000/saveorder',clickeditem,headers).
  then((res) => { 
    
    let datanotif={"order":"came"};
  
    axios.post('https://maker.ifttt.com/trigger/test/json/with/key/jxXUCw2mVTgSGLGLTlHCSSr0lVncXsyh3Cx1YGH_xnC',datanotif).then((res) => {
      console.log("hello it placed a request bro");
    });
    
    
    
    navigate("/myorders")})
  .catch((err) => {
    console.log(err);
  });

  }

  function deleteitem(id,price){

    console.log(id);

    setclick(prevvalue => {

     return prevvalue.filter((item,index) => {
        return (index+1)!==id;
      })





    })

    setprice(prevvalue => {
      return {
          totalp:prevvalue.totalp-price
      }
  })


  }


    function returnempty(){

        setempty(true);

    }

    function printdata(eachitem){
        return <Entry 
        src={eachitem.src}
        name={eachitem.item}
         desc={eachitem.desc}
         maxprice={eachitem.maxprice}
         placeholder={eachitem.placehold}
         clickeditem={fillclickeditem}
         />
    }

    const [items,setItem]=useState({food:true,stat:false,groc:false,smoke:false});

     const [clickeditem,setclick]=useState([]);

     const [price,setprice]=useState({totalp:0});

     let sumofd=0;

     let deliveryc=0;

     function fillclickeditem(item){

      console.log(item);
 

      setempty(false);
        
setclick(prevvalue => {
            return [...prevvalue,item];
     });

     

     setprice(prevvalue => {
         return {
            totalp: prevvalue.totalp + (Number(item.maxprice) * Number(item.quantity))
         }
     })



    // setprice(prevvalue => {
    //     return {
    //         totalp:prevvalue.totalp
    //     }
    // })


     }

     function displayflow(event){

      const {value,name}=event.target;
       
      if(value=="food"){

          setItem({
             food:true
          })
      }

      if(value=="stat"){

          setItem({
               
             stat:true
          })
      }

      if(value=="groc"){

          setItem({
              
             groc:true
          })
      }

      if(value == "smoke"){
        setItem({
          ...items,smoke:true
        })
      }

   }

    return (
        <div>
          <h1>Hello {name}</h1>




          
<div class="row division">
<div className="mainboxes">
    <div class="col col-4"  >
         
            <img class="ordermain" src="/images/foodie.png" onClick={displayflow}  value="food"></img> 
            {/* <a class="btn btn-warning" href=<%= detu %>> */}
             
            {/* </a> */}
          
    </div>
    
    <div class="col col-4" >

      <img class="ordermain" src="/images/station.png" onClick={displayflow}  value="stat"></ img>

      
      {/* <%  detu = "/sannitiki/" + detar +  "," + jagant + "," + kcrd %>
       
          <a class="btn btn-warning" href=<%= detu %>>STATIONARY ITEMS</a> */}
                 
    </div>
   

    
    <div class="col col-4"  >
        <div class="dropdown show">
            <img class="ordermain"  src="/images/groce.png" onClick={displayflow}  value="groc"></img>

            {/* <%  detu = "/gannitiki/" + detar +  "," + jagant + "," + kcrd %>

             <a class="btn btn-warning" href=<%= detu %>> */}
              
            {/* </a> */}
          </div>
    </div>
    </div>
    </div>
    {/* <div class="buttons3">
    <button onClick={displayflow} className="btn btn-warning gotoright" value="food" >FOOD ITEMS</button>
    <button onClick={displayflow} className="btn btn-warning gotoright" value="stat">STATIONARY ITEMS</button>
    <button onClick={displayflow} className="btn btn-warning gotoright" value="groc">GROCERY ITEMS</button>
    </div> */ }
<div className="itemflow1">
   <div className="itemsflow" style={{overflowY : "scroll" } } >

   


    { items.food && Fooditems.map(printdata)} 

    { items.groc && Grocery.map(printdata)}

    { items.stat && Stationary.map(printdata)}

    {!items.smoke && <button  onClick={displayflow} value="smoke" class="btn smoke btn-danger">Smoking is injurious</button>}

    {items.smoke && Smoking.map(printdata)}


    </div>
    </div>

{/* <div className="forback"> */}
   <div class="preinfo">
    <h1 class="orders" >Orders Table</h1>
     
  </div>

  <table class="table">
     

  <thead>
    <tr>
      <th scope="col">S.no</th>
      <th scope="col">Item</th>
      <th scope="col">Quantity</th>
      <th scope="col">Max Cost</th>
      <th scope="col">Remove</th>
    </tr>
  </thead>
<tbody>
 { clickeditem.map((orderitem,index) => {

    return <Predeftable
      id={index}
      name={orderitem.name}
      quantity={orderitem.quantity}
      price={orderitem.maxprice}
      delete={deleteitem}
      />
 

  })

}


{empty && <Empty 
clickeditem={fillclickeditem}
/>}

</tbody>
</table>

<button   class="plus" onClick={returnempty} >+ Add</button>


  
<Lastinfo 
totalprice={price.totalp}
clickeditem={clickeditem}
 
/>


<div class="textbox ">
  <button  onClick={senddata} class="palceorder">Place Order</button>
</div>
        </div>
        // </div>

    );
}

export default Orders;