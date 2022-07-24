import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import pool from './db/dababase.mjs';
import createUser from './Controller/user/createUser.mjs';
import deleteUser from './Controller/user/deleteUser.mjs';
import createBlog from './Controller/blog/createBlog.mjs';
import deleteBlog from './Controller/blog/deleteBlog.mjs';
import updateBlog from './Controller/blog/updateBlog.mjs';
import readBlog from "./Controller/blog/readBlog.mjs"

dotenv.config();

let port = process.env.PORT || 3000;
let app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//controllers
app.get('/', (req, res) => {
   res.send({ message: `Running on port ${port}` });
});
app.use('/createUser', createUser);
app.use('/deleteUser', deleteUser);
app.use('/createBlog', createBlog);
app.use('/deleteBlog', deleteBlog);
app.use('/updateBlog', updateBlog);
app.use('/readBlog', readBlog);

//Connect to Database
pool.connect(function (err) {
   if (err) throw err;
   console.log("Connected!");
});

//Create a server
app.listen(port, () => {
   console.log(`Server running on ${ip.address()} on port ${port}`);
});