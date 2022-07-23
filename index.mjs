import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

var app = express();

app.use(cors({origin:'*'}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
var port = process.env.PORT || 3000;


//
app.get('/', (req,res)=>{
   res.send({message:"Running"});
})


app.listen(port, () =>{
   console.log(`Server running on ${ip.address()} on port ${port}`);
});