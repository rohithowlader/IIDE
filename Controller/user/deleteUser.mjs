import express from "express";
import pool from '../../db/dababase.mjs';
var deleteUser = express.Router();

deleteUser.post('/', async (req, res) => {
    //checking user exists or not
    let checkingSql = 'SELECT * FROM users WHERE Email = ? ';
    await pool.query(checkingSql, [req.body.email], (err, result) => {
        if (err) throw err;
        //if user doesn't exists then delete from database
        if (result.length == 0) {
            res.status(409).json({
                message: `User not present`
            });
        }
        else {
            let deleteSql = "DELETE FROM users WHERE Email = ?";

            pool.query(deleteSql, [req.body.email], (err, result) => {

                if (err) throw err;
                res.status(200).json({
                    message: `User deleted`
                });
            });

        }

    });
});
export default deleteUser;