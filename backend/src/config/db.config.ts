// require('dotenv').config()
// this needs to be managed using a .env file
// Put the Mongo connection string in the file as MONGO_CONNECTION_STRING="xxxx"
// const url = process.env.MONGO_CONNECTION_STRING;


import mongoose from 'mongoose';
import { ConnectionOptions } from 'tls';

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const connect = await mongoose.connect("mongodb://127.0.0.1:27017/comp307" as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectionOptions);
        console.log("Database is connected!");
    } catch (error: any) {
        console.log(error.message);
    }
}

export default connectDB;