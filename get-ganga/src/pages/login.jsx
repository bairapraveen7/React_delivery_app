

function Login(props){

    function checkdet(event){

        event.preventDefault();

        let rollno = event.target.previousElementSibling.previousElementSibling.value;

        let phoneno1 = event.target.previousElementSibling.value;

        if(!(/[0-9]{12}$/.test(rollno))){
             window.confirm("Invalid format of rollno");
        }

        else if(!(/[0-9]{10}$/).test(phoneno1)){
            window.confirm("Invalid format of phoneno")
        }

        else{
        props.logit(rollno,phoneno1);
        }

    }

    return (
            <>
    <h4 class="head11">LOGIN</h4>
    <form class="form2">
       <input type="text" class="form-control" name="rollno" pattern="[0-9]{12}" placeholder="ROLL NO" required></input>
       <input type="text" class="form-control" name="phoneno" pattern="[0-9]{10}" placeholder="PHONE NO" required></input>
       <button type="submit" onClick={checkdet} class="btnlogin" value="recognise me">Login</button>
        </form>
        </>
    );
}

export default Login;