import express from "express";
import pool from '../../db/dababase.mjs';
let updateBlog = express.Router();

updateBlog.post('/', async (req,res) =>{
    //checking if blog exists in blogs Database
    let checkingSql = 'SELECT * FROM blogs WHERE Blog_id = ? ';
    await pool.query(checkingSql, [req.body.blogId], (err, result) => {
        if (result.length == 0) {
            return res.status(404).json({
                message: `Blog not present`
            });
        }
        else {
            let Title=null,Messages=null, Images=null;
            let retriveSql="SELECT Title,Messages,Images FROM blogs WHERE Blog_id = ? ";
            pool.query(retriveSql, [req.body.blogId], (err,result)=>{
                if (err) throw err;
                Title= result[0].Title;
                Messages=result[0].Messages;
                Images=result[0].Images;
                if ( !(typeof(req.body.Title) === "undefined")) {
                    Title=req.body.Title;
                }
                if ( !(typeof(req.body.Messages) === "undefined")) {
                    Messages=req.body.Messages;
                }
                if ( !(typeof(req.body.Images) === "undefined")) {
                    Images=req.body.Images;
                }
                let updateSql = "UPDATE blogs SET Title = ?, Messages= ?, Images = ?  WHERE Blog_id = ?";
                pool.query(updateSql,[Title,Messages,Images,req.body.blogId],(err,result) => {
                    if (err) throw err;
                    return res.status(200).json({
                        message: `Blog Updated`
                    });
                });
            })
        }
    });
});
export default updateBlog;