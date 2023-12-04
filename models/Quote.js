import mongoose from "mongoose";

const quoteSchema = mongoose.Schema({
    quote: { type: String, required: true },
    user_id: { type: mongoose.Types.ObjectId, required: true },
})

mongoose.model("Quote", quoteSchema)