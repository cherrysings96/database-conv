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


  loginapp.post("/merchandise", async (req, res) => {
    try {
      const { merchName } = req.body;
      const newMerchname = await pool.query(
        "INSERT INTO merchdata (merchName) VALUES($1) RETURNING *",
        [merchName]
      );
      console.log('hello');
      console.log(newMerchname);
      res.json(merchName.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  loginapp.get("/merchandise", async (req, res) => {
    try {
      const allMerch = await pool.query("SELECT * FROM merchdata");
      res.json(allMerch.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  loginapp.get("/merchandise/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const merchName = await pool.query("SELECT * FROM merchdata WHERE ID = $1", [
        id
      ]);
  
      res.json(merchName.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  loginapp.put("/merchandise/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateMerchname = await pool.query(
        "UPDATE merchdata SET description = $1 WHERE ID = $2",
        [description, id]
      );
  
      res.json("Merchandise Data was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  loginapp.delete("/merchandise/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteMerchname = await pool.query("DELETE FROM merchdata WHERE ID = $1", [
        id
      ]);
      res.json("The merchandise data you selected was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });
  

  loginapp.listen(5000,() =>{
    console.log("server is running at port 5000")
});