import mongoose from "mongoose";

const signupUser = new mongoose.Schema({

    firstname:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique: true
    },
    phone:{
       type:Number,
       require:true
    },
    password:{
        type:String,
        require:true
    }
});

const user = mongoose.model('user',signupUser)

export default user;