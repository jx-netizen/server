import mongoose from "mongoose";


export const Connection = async (username,password)=>{
    const URL = `mongodb+srv://${username}:${password}@ecommerce.hojwqux.mongodb.net/FLIPKART?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;