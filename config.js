import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const DB_URI = process.env.DB_URI
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => console.log("Conneted to MongoDB"))
mongoose.connection.on("error", (error) => console.log("Connetion error", error))
const DB = mongoose;
export default DB