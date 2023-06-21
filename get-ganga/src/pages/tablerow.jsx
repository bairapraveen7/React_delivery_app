import { useEffect, useState } from "react";




function Tablerow(props){

    const [cancel,setcancel] = useState(false);

    let thedate = new Date();

    let thed= thedate.toDateString();

    

    useEffect(() => {

        if(props.date  === thed){
            setcancel(true);
        }

    });

    


    return (
      
        <tr class="trr">   
      
       

<th scope="row">-</th>
  <td className="itstd">{props.item}</td>
  <td className="itstd">{props.quantity}</td> 
  <td className="itstd">{props.maxprice}</td>

  
    
      {cancel && <td><button onClick={() => {props.delete(props.id)}} class="btn btn-outline-warning" >cancel the order</button></td> }
    


   
</tr>

    );
}

export default Tablerow;