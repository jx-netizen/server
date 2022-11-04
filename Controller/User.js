import user from "../Model/signUser.js";
import Product from "../Model/product.js";
import paytmchecksum from '../paytm/PaytmChecksum.js';
import { paytmParams, paytmMerchantkey } from '../index.js';
import formidable from 'formidable';
import https from 'https'

export const userSignup = async (req, res) => {
  try {
    const exist = await user.findOne({email: req.body.email});
    if(exist) {
        return res.status(401).json({message:"email alreadyy exist"});
    }
    const SignupUser = req.body;
    const newUser = new user(SignupUser);
    await newUser.save();

    res.status(200).json({ message: SignupUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const userLogin = async (req,res) =>{
  try {
    const email = req.body.email;
    const password = req.body.password;

    let username = await user.findOne({email:email,password:password});
    if(username){
      res.status(200).json({data: username});
    }
    else {
      res.status(401).json("User not found");
    }


  }
  catch(error){
     res.status(500).json({message: error.message});
  }
};

export const getProduct = async(req,res)=>{
  try {
   const products = await Product.find({});
   res.status(200).json({products});
  }
  catch (error){
    res.status(500).json({message: error.message});
  }

}
export const getProductDetail = async(req,res)=>{
  try {
      const id = req.params.id;
      const product = await Product.findOne({'id':id});
      res.status(200).json({product});
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
}
export const paymentPay = async(req,res) =>{
  const paytmCheckSum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantkey);
    try {
        const params = {
            ...paytmParams,
            'CHECKSUMHASH': paytmCheckSum
        };
        res.status(200).json(params);

  }
  catch(error){
    res.status(500).json({message: error.message});
  }
}
export const paytmResponse = async (request,response)=>{
  const form = new formidable.IncomingForm();
    const paytmCheckSum = request.body.CHECKSUMHASH;
    delete request.body.CHECKSUMHASH;

    const isVerifySignature = paytmchecksum.verifySignature(request.body, paytmMerchantkey, paytmCheckSum);
    if (isVerifySignature) {
        let paytmParams = {};
        paytmParams["MID"] = request.body.MID;
        paytmParams["ORDERID"] = request.body.ORDERID;

        paytmchecksum.generateSignature(paytmParams, paytmMerchantkey).then(function (checksum) {

            paytmParams["CHECKSUMHASH"] = checksum;

            const post_data = JSON.stringify(paytmParams);

            const options = {
                hostname: 'securegw-stage.paytm.in',
                port: 443,
                path: '/order/status',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };

            let res = "";
            const post_req = https.request(options, function (post_res) {
                post_res.on('data', function (chunk) {
                    res += chunk;
                });

                post_res.on('end', function () {
                    let result = JSON.parse(res);
                    console.log(result);
                    response.redirect(`http://localhost:3000/`)
                });
            });
            post_req.write(post_data);
            post_req.end();
        });
    } else {
        console.log("Checksum Mismatched");
    }
}