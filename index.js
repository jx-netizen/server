import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from "./Connection/db.js";
import DefaultData from "./default.js";
import Router from "./Routes/route.js";
import {v4 as uuid} from "uuid";


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
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',Router);

export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID,
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
paytmParams['ORDER_ID'] = uuid(),
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID,
paytmParams['TXN_AMOUNT'] = '500',
paytmParams['CALLBACK_URL'] = 'http://localhost:8800/callback'
paytmParams['EMAIL'] = 'suman@gmail.com'
paytmParams['MOBILE_NO'] = '1234567852'