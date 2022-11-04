import express from "express";
import { userSignup } from "../Controller/User.js";
import { userLogin } from "../Controller/User.js";
import { getProduct,getProductDetail , paymentPay,paytmResponse} from "../Controller/User.js";

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin );
router.get('/product', getProduct);
router.get('/product/:id',getProductDetail);
router.post('/payment',paymentPay);
router.post('/callback',paytmResponse);

export default router;
