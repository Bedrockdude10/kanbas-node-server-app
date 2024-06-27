import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    department: { type: String, required: false },
    credits: { type: Number, required: false },
    description: String,
    author: String // Optional, only include if relevant
}, {
    collection: "courses"
});

export default courseSchema;
