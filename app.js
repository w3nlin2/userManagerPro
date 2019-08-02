//创建服务器，监听3000端口
const express=require("express");
const server=express();
server.listen(5050);



//引入session
const session = require("express-session") 
//配置session
server.use(session({secret:"128位字符串",resave:true,saveUninitialized:true}))

//引入body-parser
const bodyParser=require("body-parser"); 
server.use(bodyParser.urlencoded({extended:false}))

//public托管
server.use(express.static("public"));

//挂载在/user路径下 ，如/user/login
const router=require("./routes/router.js"); 
server.use("/user",router);