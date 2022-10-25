import  {products} from "./Constant/data.js";
import Product from "./Model/product.js";

const DefaultData = async ()=>{
    try{
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log("data sucessfully imported");
    }
    catch(error){
        console.log("Error during inserting data",error.message);
    }
}

export default DefaultData;