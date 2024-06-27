import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    _id: { type: String, required: true },  // ID generation can be handled by MongoDB if not provided
    name: { type: String, required: true },
    description: { type: String, required: false },
    course: { type: String, required: false, ref: 'Course' },
    lessons: [{
        _id: { type: String, required: false },  // ID can also be auto-generated
        name: { type: String, required: false },
        description: { type: String, required: false },
        module: { type: String, required: false, ref: 'Module' }
    }]
}, {
    collection: "modules"
});

export default moduleSchema;
