import mongoose, { Schema } from 'mongoose';


const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    describtion: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    // Which user has posted
    // One blog can be belonged to one person
    user: {
        type: mongoose.Types.ObjectId,
        ref:"userModel",
        required: true,
    },
});

export default mongoose.model("blogModel", blogSchema);