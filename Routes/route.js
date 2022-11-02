import express from "express";
import { userSignup } from "../Controller/User.js";
import { userLogin } from "../Controller/User.js";
import { getProduct,getProductDetail } from "../Controller/User.js";

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin );
router.get('/product', getProduct);
router.get('/product/:id',getProductDetail);

export default router;
