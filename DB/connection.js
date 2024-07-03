// connection file with mongoose

import mongoose from "mongoose";

export const connection_db =  async ()=>{
    try{
       await mongoose.connect("mongodb://localhost:27017/bookStore")
       console.log("Connected to The  DataBase")
    }
    catch(error){
        console.log("Error connecting to the database",error)
    }
}

