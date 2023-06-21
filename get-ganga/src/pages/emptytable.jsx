import $ from "jquery";

function Empty(props){

    function sendempty(event){

        let maxpric=event.target.parentNode.previousElementSibling.firstChild.value;

        let quant=event.target.parentNode.previousElementSibling.parentNode.previousElementSibling.firstChild.value;

        let name=event.target.parentNode.previousElementSibling.parentNode.previousElementSibling.previousElementSibling.firstChild.value
    
        props.clickeditem({name:name,maxprice:maxpric,quantity:quant})

    }

    return (
        <tr>
            
            <th scope="row"></th>
   <td><input type="text" style={{width:"7rem"}}  class="input1" pattern="[a-zA-Z]" placeholder=" "  name="itemname"></input> </td>
   <td><input type="text" class="input2" style={{width:"5rem",height:"1.8rem"}} pattern="[1-50]{1}"  min="0"  name="quantity" placeholder=" "></input></td>
   <kick class="confirmit">
   <td><input type="text" style={{width:"5rem",height:"1.8rem"}}  class="maxprice" pattern="[0-9]"   onchange="takeq32(event)" placeholder=" "></input></td>
   <td><button onClick={sendempty} className="btn btn-outline-danger"><i class="fa-solid fa-circle-check"></i>Add</button></td>
   </kick>
    
 

        </tr>
    )
}

export default Empty;