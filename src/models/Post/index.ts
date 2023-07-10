import mongoose from "mongoose";

export interface Post {
    user: string;
    text: string;
    image?: string;
    comments: any[];
}

export interface PostDocument extends Post, mongoose.Document {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
      },
    text:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: false,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment' 
      }]
    
},{timestamps: true}
); 


export default mongoose.model<PostDocument>("Post", postSchema)