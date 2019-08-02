//引入express模块 
//初始化路由
//引入pool.js

const express=require("express"); 
const router=express.Router(); 
const pool=require("../pool.js"); 




//注册
router.get("/reg",function(req,res){ 
var {uname,upwd,usex,ubirthday,usalary,uemail,uaddress}=req.query;
if(usex=="男"){usex=1;}
else{usex=0;}
console.log("usex"+usex);
pool.query("INSERT INTO user_message VALUES(NULL,?,?,?,?,?,?,?);",[uname,upwd,usex,ubirthday,usalary,uemail,uaddress],function(err,result){
if (err) throw err; 
if(result.affectedRows>0){ 
res.send(result); 
} 
}) 
}); 


//查询
router.get("/getDetails",function(req,res){
	pool.query("select * from user_message",function(err,result){
		if (err) throw err;
		if(result.length>0){
			res.send(result);
		}
	});
})


//登录
router.get("/login",function(req,res){
	var {uname,upwd}=req.query;
	pool.query("select * from user_message where uname=? and upwd=?",[uname,upwd],function(err,result){
		console.log(result);
		if (err) throw err;
		if(result.length>0){
			req.session.uid = result[0].uid; 
			res.send(result);
		}else{
			res.send({code:0});
		}
	});
})

//修改后的自动登录
router.get("/updLogin",function(req,res){
	var obj=req.query;
	pool.query("select * from user_message where uid=?",obj.uid,function(err,result){
		console.log(result);
		if (err) throw err;
		if(result.length>0){
			req.session.uid = result[0].uid; 
			res.send(result);
		}else{
			res.send({code:0});
		}
	});
})

//登录后的页面
router.get("/getlogin",function(req,res){
	var uid = req.session.uid;
	pool.query("select * from user_message where uid=?",uid,function(err,result){
		console.log(result);
		if(err) throw err;
		if(result.length>0){
			console.log("result::::++++"+result[0].ubirthday);
			
			res.send(result);
		}
		
	});
	
	
})




//点击“修改”按钮，将当前uid存入session.uidUpd
router.post("/toUpdata",function(req,res){
	var uidUpd = req.body.uidUpd;
	
	pool.query("select * from user_message where uid=?",uidUpd,function(err,result){
		console.log(result);
		if (err) throw err;
		if(result.length>0){
			req.session.uidUpd = result[0].uid; 
			res.send(result);
		}else{
			res.send({code:0});
		}
	});
})

//修改页获取uidUpd
router.get("/update",function(req,res){
	var uidUpd=req.session.uidUpd;
	console.log("取"+req.session.uidUpd);
	pool.query("select * from user_message where uid=?",uidUpd,function(err,result){
		console.log(result);
		if(result.length>0){
			res.send(result);
		}
	})
})

//修改页提交修改
//修改
router.post("/updateData",function(req,res){
	var obj=req.body;
	console.log(obj.ubirthday);
	
	pool.query("update user_message set uname=?,upwd=?,usex=?,ubirthday=?,usalary=?,uemail=?,uaddress=? where uid=?",[obj.uname,obj.upwd,obj.usex,obj.ubirthday,obj.usalary,obj.uemail,obj.uaddress,obj.uid],function(err,result){
		console.log(result);
		if(err) throw err;
		
		if(result.affectedRows>0){
			res.send({code:200,msg:"update success"});
		}
	})
})

//根据uid删除数据
router.post("/delete",function(req,res){
	var obj=req.body;
	console.log(obj.uid);	
	pool.query("delete from user_message where uid=?",parseInt(obj.uid),function(err,result){
		if(err)throw err;
		console.log(result);
		if(result.affectedRows>0){
			res.send({code:200,msg:"delete success"});
		}
	})
})


//分页
router.get("/list",function(req,res){
	var obj=req.query;
	obj.upage=parseInt((obj.upage-1)*obj.ucount);
	obj.ucount=parseInt(obj.ucount);
	console.log(obj);
	pool.query("select * from user_message limit ?,?",[obj.upage,obj.ucount],function(err,result){
		if(err) throw err;
		console.log(result);
		res.send(result);
	})
})


module.exports=router;