import user from "../Model/signUser.js";
import Product from "../Model/product.js";

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