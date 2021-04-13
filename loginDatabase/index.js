const express = require("express");
const loginapp = express();
const cors = require("cors");
const pool = require("./dblogin");

const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//middleware

loginapp.use(express.json());
loginapp.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","DELETE","PUT"],
    credentials: true,
  })
);

loginapp.use(cookieParser());
loginapp.use(bodyParser.urlencoded({ extended: true }));

loginapp.use(
  session({
    key: "userId",
    secret: "cokkie collect server",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 60,
    },
  })
);

//Routes

loginapp.post("/login", async (req, res) => {
  try {
    const { inputemail, inputpassword } = req.body;
    const loginUser = await pool.query(
      `SELECT * FROM userdata WHERE userdata.email=$1`,
      [inputemail]
    );
    if (inputpassword === loginUser.rows[0].password) {
      console.log("Hello");

      req.session.user = { auth: true };
      console.log(req.session.user);

      res.json({ auth: true });
    } else {
      console.log("world");
      res.json({ auth: false });
    }
  } catch (err) {
    console.error(err.message);
  }
});

loginapp.get("/logcheck", (req, res) => {
  console.log(req.session);
  if (req.session.user) {
    console.log("inside logcheck");
    res.json({ auth: true });
  }else{
    res.json({auth: false});
  }
});
loginapp.get("/logoutcheck", (req, res) => {
  req.session.user = { auth: false };
  res.json({ auth: false });
});

loginapp.post("/todos/insert", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
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
      id,
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
    res.json(updateTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

loginapp.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

loginapp.get("/userdata", async (req, res) => {
  try {
    const allusers = await pool.query("SELECT * FROM userdata");
    res.json(allusers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

loginapp.post("/userdataentry", async (req, res) => {
  try {
    const { id, fullname, email, password } = req.body;
    const newuser = await pool.query(
      "INSERT into userdata(id,fullname,email,password) VALUES ($1,$2,$3,$4) RETURNING *",
      [id, fullname, email, password]
    );

    console.log(id, fullname, email, password);
    console.log(newuser);

    res.json(newuser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

loginapp.delete("/userdelete/:id", async (req, res) => {
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

loginapp.listen(5000, () => {
  console.log("server is running at port http://localhost:5000");
});
