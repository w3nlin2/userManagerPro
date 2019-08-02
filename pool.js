const mysql=require("mysql"); 
const pool=mysql.createPool({ 
host:"w.rdc.sae.sina.com.cn", 
post:"3307", 
user:"wxnzyy1j4w", 
password:"0jjll0l0hmh2mzllh0wmhhwhh24x52xmlmz24ml5", 
database:"app_w3nlin4", 
connectionLimit:20 
}); 

module.exports=pool;