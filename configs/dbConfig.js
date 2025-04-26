import mongoose from "mongoose";
import globalConfig from "./globalConfig.js";

export const connectDatabase = () => {

    let DB_URI = "";

    if (globalConfig.environment === "DEVELOPMENT") DB_URI = globalConfig.mongoDev;
    if (globalConfig.environment === "PRODUCTION") DB_URI = globalConfig.mongoProd;

    mongoose.connect(DB_URI).then(con => {
        console.log(`MongoDB database connected with HOST ${con?.connection?.host}`);
    });
}