import mongoose from "mongoose";

const connetdb = async() =>{
    mongoose.connection.on('connected',()=>{
        console.log("Connection Established");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/spotify`)
}

export default connetdb;