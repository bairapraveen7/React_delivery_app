
function Entry(props){

    let name=props.name;

    let thename=name.toUpperCase();

    function setclick(event){

        let quantity=event.target.previousElementSibling.value;

        props.clickeditem({name:props.name,maxprice:props.maxprice,quantity:quantity});


    }

    return (
        
        <div>
             
        <div className="flitems">
            <div className="row66">
            
                <div className="orderboxnames">
      <img className="order orderit" src={props.src}></img>
      <br />
      <div className="center">
          <itemname>{thename}</itemname> <br />
          <itemcost>{props.desc}</itemcost><br />
          </div>
        
         </div>
      <div class="selit">
      <input type="Number" className="ittoorder" min="0" placeholder={props.placeholder} ></input> 
      <button onClick={setclick}  class="Additemtocart" > Add </button>
      </div>
      </div>
         
         </div>
         </div>
     
     );
}

export default Entry;