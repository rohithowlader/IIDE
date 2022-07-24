import express from "express";
import pool from '../../db/dababase.mjs';
let createBlog = express.Router();

createBlog.post('/', async (req, res) => {

    //checking if user exists
    let checkingSql = 'SELECT * FROM users WHERE Email = ? ';
    await pool.query(checkingSql, [req.body.email], (err, result) => {

        if (result.length == 0) {
            return res.status(404).json({
                message: `User not present`
            });
        }
        else {
            let userSql = 'SELECT Users_id FROM users WHERE Email = ? ';
            pool.query(userSql, [req.body.email], (err, result) => {
                if (err) throw err;
                let use = result[0].Users_id;
                let sql = "INSERT INTO blogs (Messages, Images,Title, Users_id) VALUES (? , ? , ? , ?)";
                pool.query(sql, [req.body.Messages, req.body.Images, req.body.Title, use], (err, result) => {
                    if (err) throw err;
                    return res.status(200).json({
                        message: `Blog created`
                    });
                });

            });
        }


    });
});
export default createBlog;