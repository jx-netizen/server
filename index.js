import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import Connection from "./Connection/db.js";
import DefaultData from "./default.js";
import Router from "./Routes/route.js";


const app = express();

dotenv.config();



const PORT = 8800;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username,password);

app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`);
});



DefaultData();
app.use(cors());


app.use('/',Router);