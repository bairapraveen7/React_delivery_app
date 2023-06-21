import { PromiseProvider } from "mongoose";

function Register(props){

  function senddetails(event){

    console.log("hi");

    event.preventDefault();

    let phoneno=event.target.previousElementSibling.value;
    let uname=event.target.previousElementSibling.previousElementSibling.value;
    let rollno=event.target.previousElementSibling.previousElementSibling.previousElementSibling.value;

    if(!(/[0-9]{12}$/.test(rollno))){
      window.confirm("Invalid format of rollno");
 }

   else if(!(/[0-9]{10}$/).test(phoneno)){
     window.confirm("Invalid format of phoneno")
 }


       else{
    props.regist(rollno,uname,phoneno);
       }

  }

    return (
        <div>
         <img class="deliv" src="images/gets_ganga.png" width="200px" height="200px"></img>
{/* <div class="row"> */}
      {/* <div class="col-lg-4 col-sm-12">
    <img class="deliv" src="images/delivery.jpg" width="200px" height="200px"></img>
    </div> */}
      
    <div class="register">
    {/* <p style="color:red"><%= message %></p> */}
    <h4 class="head11">SIGN UP</h4>
  <form class="form1">
       <input type="text" class="form-control" pattern="[0-9]{12}" placeholder="ROLL NO" name="rollno" required></input>
     <input type="text" class="form-control" pattern="^\w[\w ]*\w$" placeholder="NAME" name="name" required></input>
        <input type="text" class="form-control" pattern="[0-9]{10}" placeholder="PHONE NO" name="phoneno" required></input>
       <input type="submit" onClick={senddetails} class="btnsignup" value="Sign Up"></input>
       {/* <a  ><button type="button"  class="btn log btn-dark">Log In</button></a><span class="check">-if registered-</span> */}
  </form>
    </div>
    
{/* </div> */}
        </div>
        );
}

export default Register;