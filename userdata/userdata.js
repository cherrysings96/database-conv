const express = require ('express');
const user = express();
const port= 5000;
const cors = require('cors');
const pool = require('./dbUser');

user.use(cors());
user.use(express.json());


user.post("/login", async (req, res) => {
    try {
        const { inputemail, inputpassword } = req.body; 
        console.log(inputemail);
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


user.get("/userdata", async (req, res) => {
    try {
      const allusers = await pool.query("SELECT * FROM userdata");
      res.json(allusers.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

user.post("/userdataentry", async (req, res)=>{
  try{
    const {id,fullname,email,password} = req.body;
    const newuser = await pool.query(
      "INSERT into userdata(id,fullname,email,password) VALUES ($1,$2,$3,$4) RETURNING *",
      [id,fullname,email,password]
    );

    console.log(id,fullname,email,password);
    console.log(newuser);

    // res.json(newuser.rows[0]);
  }catch(err){
    console.error(err.message);
  }
});

user.delete("/userdelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM userdata WHERE id = $1", [
      id,
    ]);
    res.json("User was deleted!");
  } catch (err) {
    console.log("cannot delete");
    console.log(err.message);
  }
});

user.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });

 
  