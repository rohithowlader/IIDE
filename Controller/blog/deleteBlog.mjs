import express from "express";
import pool from '../../db/dababase.mjs';
let deleteBlog = express.Router();

deleteBlog.post('/', async (req, res) => {

    //checking if user exists
    let checkingSql = 'SELECT * FROM blogs WHERE Blog_id = ? ';
    await pool.query(checkingSql, [req.body.blogId], (err, result) => {
        
        if (result.length == 0) {
            return res.status(404).json({
                message: `Blog not present`
            });
        }
        else {
            let deleteSql = 'DELETE FROM blogs WHERE Blog_id = ? ';
            pool.query(deleteSql, [req.body.blogId], (err, result) => {
                if (err) throw err;
                return res.status(200).json({
                    message: `Blog deleted`
                });
            });
        }


    });
});
export default deleteBlog;