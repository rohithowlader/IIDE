import express from "express";
import mysql from 'mysql';
import pool from '../db/dababase.mjs';


var user = express.Router();
// const ispresent = async (email) =>{
//     let sql1 = 'SELECT * FROM users WHERE Email = ? ';
//      pool.query(sql1, [email], (err, result) => {
//         if (err) throw err;
//         return result.length;
//     });

// }

user.post('/', async (req, res) => {

    //checking if user exists
    let sql1 = 'SELECT * FROM users WHERE Email = ? ';
    await  pool.query(sql1, [req.body.email], (err, result) => {
        if (err) throw err;
        //if user doesn't exists then insert into database
        if (result.length == 0) {
            let sql2 = "INSERT INTO users (First_name, Last_name, Email) VALUES ( ?, ?, ? )";

            pool.query(sql2, [req.body.fname, req.body.lname, req.body.email], (err, result) => {

                if (err) throw err;
                console.log(result);
                res.status(200).json({
                    message: `User ${req.body.fname} added`
                });
            });
        }
        else
        {
            res.status(409).json({
                message: `User ${req.body.fname} already present`
            });

        }
        
    });
    

});
export default user;