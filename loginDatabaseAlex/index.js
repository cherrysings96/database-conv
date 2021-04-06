const express = require("express");
const loginapp = express();
const cors = require("cors");
const pool = require("./dblogin");

//middleware

loginapp.use(express.json());
loginapp.use(cors());



//Routes

loginapp.post("/login", async (req, res) => {
    try {
        const { inputemail, inputpassword } = req.body; 
        const loginUser = await pool.query(`SELECT * FROM userdata WHERE userdata.email=$1`,[inputemail]);

        console.log(loginUser);
        console.log(inputpassword);
        console.log(loginUser.rows[0].password)
      if (inputpassword === loginUser.rows[0].password) {
        console.log("Hello");
        res.json({auth:true});
      }
      else{
        console.log("world");
        res.json({auth:false});
      }  

    } catch (err) {
      console.error(err.message);
    }
  });






  loginapp.listen(5000,() =>{
    console.log("server is running at port 5000")
});