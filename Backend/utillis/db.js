import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB is Connected')
    }catch(err){
     console.log ('something went wrong!')
     console.log(err);
    }
}

export default connectDB;