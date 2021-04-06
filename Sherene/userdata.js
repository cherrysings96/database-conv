const express = require ('express');
const user = express();
const port = 5001;
const cors = require('cors');
const pool = require('./dbSherene');

user.use(cors());
user.use(express.json());

user.post("/userdata", async (req, res)=>{
    console.log("hello");
    try{
        const{ id,fullname,email,password }= req.body;
        const newuser = await pool.query(
            "INSERT INTO userdata(id,fullname,email,password) VALUES ('id','&fullname','&email','&password')",
            [id,fullname,email,password]);
        

        res.json(newuser.rows[0]);

    }catch(err){
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

  user.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  