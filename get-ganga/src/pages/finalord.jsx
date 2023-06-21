import { useState } from "react";
import { useEffect } from "react";
import axios  from "axios";
import Tablerow from "./tablerow";
import { each } from "jquery";

const getallod= async(headers) => {
 
    return await axios.post('http://localhost:3000/getallorders',null,headers).
     then((res) => res.data)
     .catch((err) => {
       console.log(err);
     });
   }

   const cancelord= async(headers,data) => {
 
    return await axios.post('http://localhost:3000/cancelit',data,headers).
     then((res) => res.data)
     .catch((err) => {
       console.log(err);
     });
   }

function Allorders(){

    let take=localStorage.getItem("token");

    const [allord,setallord]=useState([]);

    const [iford,setiford]=useState(false);

    function deleteitem(id){

      console.log(id);

      var headers={
        withCredentials:true,
        headers :{'Authorization':'Bearer '+take}
      }
    
         cancelord(headers,{"id":id}).then((res) => {setallord(res.allorders)});
         

       

    }

    function getrowman(eachitem){

     return  <Tablerow id={eachitem._id} item={eachitem.item} quantity={eachitem.quantity} maxprice={eachitem.maxprice} date={eachitem.dateoford} delete={deleteitem}/>

    }

  var headers={
    withCredentials:true,
    headers :{'Authorization':'Bearer '+take}
  }

  useEffect(() => {

    getallod(headers).then((res) => {setallord(res.allorders);setiford(true)});
     

  },[allord])
     
    

    return (

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

{    true && allord.map(getrowman)}
     
        


  </tbody>
  </table>
    )
}

export default Allorders;