import express from "express";
import pool from '../../db/dababase.mjs';
let deleteBlog = express.Router();

deleteBlog.post('/', async (req, res) => {
    //checking if blog exists in blogs Database
    let checkingSql = 'SELECT * FROM blogs WHERE Blog_id = ? ';
    await pool.query(checkingSql, [req.body.blogId], (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            return res.status(404).json({
                message: `Blog not present`
            });
        }
        else {
            //Delete Blog from blogs Database
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