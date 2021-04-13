const express = require("express");
const loginapp = express();
const cors = require("cors");
const pool = require("./dblogin");
const app = express();

//const session = require("express-session");

//middleware

loginapp.use(express.json());
loginapp.use(cors());

// app.use(
//   session({
//     secret: "cokkie collect server",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

//Routes

loginapp.post("/login", async (req, res) => {
  try {
    const { inputemail, inputpassword } = req.body;
    const loginUser = await pool.query(
      `SELECT * FROM userdata WHERE userdata.email=$1`,
      [inputemail]
    );

    console.log(loginUser);
    console.log(inputpassword);
    console.log(loginUser.rows[0].password);
    if (inputpassword === loginUser.rows[0].password) {
      console.log("Hello");
      res.json({ auth: true });
    } else {
      console.log("world");
      res.json({ auth: false });
    }
  } catch (err) {
    console.error(err.message);
  }
});

// app.get("/", (req, res) => {
//   // req.session.isAuth = true;
//   console.log(req.session);
//   res.send("Hello Session login");
// });



loginapp.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

loginapp.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

loginapp.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

loginapp.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

loginapp.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
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

  loginapp.get("/merchandiseentry", async (req, res) => {
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
      const { merchName } = req.body;
      const updateMerchname = await pool.query(
        "UPDATE merchdata SET merchName = $1 WHERE ID = $2",
        [merchName, id]
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
  

loginapp.listen(5000, () => {
  console.log("server is running at port http://localhost:5000");
});
