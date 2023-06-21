import { useState } from "react";


function Lastinfo(props){
   

  let totalp = Number(props.totalprice);

  let delivery=0;

 

  

  if(totalp <= 100){

    console.log("hi");
    if(props.clickeditem.length<3){
        delivery=Math.ceil(totalp*0.12);
    }
    else{
        delivery=Math.ceil(totalp*0.14);
    }
}

else if(totalp>100 && totalp<=200){
    delivery=Math.ceil(totalp*0.12);
}
else{
    delivery=25;
}

 

   
  


    return (
        <div className="3boxes">
         
            <div class="lastinfo">
          <div class="total">
            <h4 className="totalorders"style={{fontSize:"xx-large"}}>Total Price</h4>
            </div>
            <div class="thelastbro row">
              <div class="odr1">
  <div>
  <totalprice class="totprice">Price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</totalprice>
  </div>
  <div>
  <delivery class="totprice">Delivery&nbsp;&nbsp;&nbsp; &nbsp;:</delivery>
  </div>
   
<div>
  <total class="totprice">Total Cost&nbsp;&nbsp; :</total>
  </div>
  <br></br>
  <br></br>
  </div>
  <div class="odr2">
  <b><value1 >{props.totalprice}</value1></b><br></br>
  <b><value2 >{delivery}</value2></b><br></br>
  <b><value3 >{props.totalprice + delivery}</value3></b><br></br>
  </div>
  </div>
  </div>
</div>

    
    );
}

export default Lastinfo;