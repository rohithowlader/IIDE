import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import pool from './db/dababase.mjs';
import createUser from './Controller/user/createUser.mjs';
import deleteUser from './Controller/user/deleteUser.mjs';
import createBlog from './Controller/blog/createBlog.mjs';
import deleteBlog from './Controller/blog/deleteBlog.mjs';

dotenv.config();

var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
var port = process.env.PORT || 3000;


//controllers
app.get('/', (req, res) => {
   res.send({ message: "Running" });
});
app.use('/createUser', createUser);
app.use('/deleteUser', deleteUser);
app.use('/createBlog', createBlog);
app.use('/deleteBlog', deleteBlog);

pool.connect(function (err) {
   if (err) throw err;
   console.log("Connected!");
});


app.listen(port, () => {
   console.log(`Server running on ${ip.address()} on port ${port}`);
});