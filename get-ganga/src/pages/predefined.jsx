

function Predeftable(props){

  let name = props.name.toUpperCase();

    return (
    <tr >
     

  
  
         
        <th scope="row"><p className="itstd">{props.id+1}</p></th>
      <td className="itstd">{name}</td>
      <td ><p  className="input2 itstd">{props.quantity}</p></td>
      <td ><p  className="itstd maxprice"   >{props.price*props.quantity }</p></td>
      <td className="itstd"><a onClick={() => {props.delete(props.id+1,props.price*props.quantity)}} ><i className="fa-solid fa-trash"></i></a></td>
    

     

        
  
    </tr>
    );
}

export default Predeftable;