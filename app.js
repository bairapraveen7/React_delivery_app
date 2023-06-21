
 










const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const res = require("express/lib/response");
const { del } = require("express/lib/application");
const { each } = require("async");
const { send } = require("express/lib/response");
const session  = require('express-session');
const bcrypt = require("bcrypt");
const cors=require("cors");
const passport=require("passport");
const flash = require("connect-flash");
const  LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require("passport-local-mongoose");
const jwt = require("jsonwebtoken");
const config=require("./config");
 
const app = express();
 
app.set('view engine', 'ejs');

app.use(flash());

 app.use(cors({credentials:true,origin:'http://localhost:3001'}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","http://localhost:3001"); // update to match the domain you will make the request from
    //res.header();
    
    res.header('Access-Control-Allow-Credentials',true);

    next();
  });


 

app.use(bodyParser.json());

  

 

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  passport.use(
    new LocalStrategy({usernameField:'rollno',passReqToCallback:true}, (req,rollno,password,done)=>{
         //Match User

         User.findOne({rollno:rollno})
         .then(user => {
            if(!user){
                return done(null,false,req.flash("signup","no registration"));
            }

            //Match password

            
                if(password === user.phoneno){
                    return done(null,user);
                }
                else{
                    return done(null,false,req.flash("signup","Password Incorrect"));
                }
            })
         .catch(err => console.log(err))
        } ));


//mongoose.connect("mongodb://localhost:27017/orderd",{useNewUrlParser:true});
 
app.use(express.static("public"));

app.use(session({
    secret: 'Hicul is the greatest weapon',
    resave: false,
    saveUninitialized: true
  }));

  app.use(passport.initialize());

  app.use(passport.session());

  app.use((req,res,next) => {
    next();
  })


mongoose.connect("mongodb+srv://praveenb:Technothlon@getsganga.pgyia.mongodb.net/userd",{useNewUrlParser:true});



const userschema = new mongoose.Schema({
    rollno : String,
    name : String,
    phoneno : String
});

userschema.plugin(passportLocalMongoose);

const orderschema = new mongoose.Schema({
      rollno:String,
      item:String,
      quantity:String,
      maxprice:String,
      dateoford:String
});

const User = new mongoose.model('User',userschema);


 

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user);
    });
});



const Order = new mongoose.model('Order',orderschema);



app.get("/",function(req,res){
    res.send("hai");
});

app.post("/register",function(req,res){

    let rollno1=req.body.rollno;

    
    User.find({rollno:rollno1},function(err,results){
        if(results.length == 0){

            const Users=new User({rollno:req.body.rollno,name:req.body.uname,phoneno:req.body.phoneno});
            
            // bcrypt.genSalt(10,(err,salt) =>
            // bcrypt.hash(Users.phoneno,salt,(err,hash)=>{
            //     if(err)
            //     throw err;
            //     Users.phoneno=hash;
            //     Users.save().
            //     then(user => {
            //         res.status(200);
            //     })
            //     .catch(err => console.log(err));
            // }))

            Users.save((err,user)=>{
                if(err){
                    console.log("error in saving");
                }
                else{
                    res.send("successful Registration.Login to Continue");
                }
            })
             
        }
        else{
              res.send("Already Registered.Login to continue");
        }
    })
    
    
});

 
app.get("/orders",function(req,res){
    if(req.isAuthenticated()){
        res.status(1);
    }
    else{
        res.redirect("/login");
    }
})
 

// app.post("/login",function(req,resp){

//     let rollno1 = req.body.rollno;

//     console.log(req.body);


//       User.findOne({
//           rollno : rollno1
     
//       },
//       function(err,foundres){
//           if(err){
//           console.log("error in finding");
//           }
//           else{
//                 if(foundres){
//                if(foundres.phoneno === req.body.phoneno){
//                    nameof = foundres.name;
//                    console.log("yess");
//                        }
//                else{
//                    console.log("not a phone");
//                }
//             }
//             else{
//                 console.log("not a user");
//             }
               
//           }
//       }
//       );

// });



app.post("/checktoken",(req,res,next)=>{

    if(req.headers && req.headers.authorization){
        var authorization=req.headers.authorization.split(" ")[1];
        try{
            decoded=jwt.verify(authorization,"Hicul is greatest weapon");
            res.send(decoded.user.name);
        }
        catch(e){
            return res.status(401).send("unauthorized access");
        }



    }
      
});


app.post("/myorders",(req,res,next) => {

    if(req.headers && req.headers.authorization){
        var authorization=req.headers.authorization.split(" ")[1];
        try{
            decoded=jwt.verify(authorization,"Hicul is greatest weapon");
            let userid=decoded.user.id;
            console.log(userid);
        }
        catch(e){
            return res.status(401).send("unauthorized access");
        }



    }

});

app.post("/saveorder",(req,res,next) => {

    let allorders = req.body;

    console.log(allorders);

    let date = new Date();
    let thedate=date.toDateString();

    if(req.headers && req.headers.authorization){
        var authorization=req.headers.authorization.split(" ")[1];
        try{
            decoded=jwt.verify(authorization,"Hicul is greatest weapon");
            let userid=decoded.user._id;

            allorders.map((eachitem) => {

                const Orders=new Order({
                    rollno:decoded.user.rollno,
                    item:eachitem.name,
                    quantity:eachitem.quantity,
                    maxprice:eachitem.maxprice,
                    dateoford:thedate

                });

                Orders.save((err,user) => {
                    if(err){
                        console.log("error in insertion");
                    }
                    else{

                        console.log("successfully inserted");
                    }
                })

            });

            res.send("successful");
            
        }
        catch(e){
            return res.status(401).send("unauthorized access");
        }

    }


});

app.post("/gettodorders",(req,res,next) => {

    let date = new Date();

    let modifdate=date.toDateString();

    if(req.headers && req.headers.authorization){
        var authorization=req.headers.authorization.split(" ")[1];
        try{
            decoded=jwt.verify(authorization,"Hicul is greatest weapon");
            let userid=decoded.user._id;

            Order.find({rollno:decoded.user.rollno,dateoford:modifdate},(err,user) => {
                if(err){
                    res.send("error");
                }
                else{
                    
                    let sum=0,count=0;

                    user.map((eachitem) =>{

                        sum+=Number(eachitem.maxprice);
                        count++;

                    })

                     
                    res.send({allorders:user,sum:sum,noofitems:count});
                }
            })
            
        }
        catch(e){
            return res.status(401).send("unauthorized access");
        }

    }

});

app.post("/getallorders",(req,res,next) => {

    if(req.headers && req.headers.authorization){
        var authorization=req.headers.authorization.split(" ")[1];
        try{
            decoded=jwt.verify(authorization,"Hicul is greatest weapon");
            let userid=decoded.user._id;

            Order.find({rollno:decoded.user.rollno},(err,user) => {
                if(err){
                    res.send("error");
                }
                else{
                    res.send({allorders:user});
                }
            })
            
        }
        catch(e){
            return res.status(401).send("unauthorized access");
        }

    }

});

app.post("/login",(req,res,next) => {
    passport.authenticate('local',{failureFlash:true},(err,user,info) => {
        if(err) throw err;
        if(!user) res.status(201).send(req.flash("signup"));
        else{
            req.login(user,err => {
                if(err) throw err;
                var token=jwt.sign({user},"Hicul is greatest weapon",{ 
                    expiresIn : 3600
                });
                res.send({body:user.name,token:token});
            })
        }
    })(req,res,next);
})

 

 
app.post("/cancelit",function(req,res){

    const id=req.body.id;

    console.log(id);

     
    Order.deleteOne({_id:id},function(err){
        if(!err){

            if(req.headers && req.headers.authorization){
                var authorization=req.headers.authorization.split(" ")[1];
                try{
                    decoded=jwt.verify(authorization,"Hicul is greatest weapon");
                    let userid=decoded.user._id;
        
                    Order.find({rollno:decoded.user.rollno},(err,user) => {
                        if(err){
                            res.send("");
                        }
                        else{
                            res.send({allorders:user});
                        }
                    })
                    
                }
                catch(e){
                    return res.status(401).send("unauthorized access");
                }
        
            }
        

        }
        else{
            console.log("error in deletion");
        }
    });


})
 

 
     


    

app.get("/login",function(req,res){
    res.render("login",{message:""});
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
    console.log("server is listening on "+port);
});

 
