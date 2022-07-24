import express from "express";
import pool from '../../db/dababase.mjs';
let readBlog = express.Router();

readBlog.post('/', async (req, res) => {
    //checking user exists or not
    let id = null, fname = null, lname = null;
    let checkingSql = 'SELECT Users_id, First_name, Last_name FROM users WHERE Email = ? ';
    await pool.query(checkingSql, [req.body.email], (err, result) => {
        if (err) throw err;
        //if user doesn't exists then delete from database
        if (result.length == 0) {
            return res.status(409).json({
                message: `User not present`
            });
        }
        //user is present
        else {
            id = result[0].Users_id;
            fname = result[0].First_name;
            lname = result[0].Last_name;
            let readSql = "SELECT Title,Messages,Images FROM blogs WHERE Users_id = ? ";
            pool.query(readSql, [id], (err, result) => {
                if (err) throw err;
                //Checking if the given user has any blogs
                if (result.length == 0) {
                    //sending message that the user doesn't have any blogs 
                    return res.status(404).json({
                        message: `User ${fname} ${lname} doesn't have any blogs`
                    })
                }
                //Showing all the blogs uploaded by given user
                else {
                    return res.status(200).json(
                        result
                    );
                }
            });
        }
    });
})
export default readBlog;