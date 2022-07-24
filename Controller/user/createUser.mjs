import express from "express";
import pool from '../../db/dababase.mjs';
let createUser = express.Router();

createUser.post('/', async (req, res) => {
    //checking if user exists
    let checkingSql = 'SELECT * FROM users WHERE Email = ? ';
    await pool.query(checkingSql, [req.body.email], (err, result) => {
        if (err) throw err;
        //if user doesn't exists then insert into database
        if (result.length == 0) {
            let insertSql = "INSERT INTO users (First_name, Last_name, Email) VALUES ( ?, ?, ? )";
            pool.query(insertSql, [req.body.fname, req.body.lname, req.body.email], (err, result) => {

                if (err) throw err;
                return res.status(200).json({
                    message: `User ${req.body.fname} added`
                });
            });
        }
        else {
            return res.status(409).json({
                message: `User ${req.body.fname} already present`
            });
        }
    });
});
export default createUser;