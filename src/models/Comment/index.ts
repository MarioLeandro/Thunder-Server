import mongoose from "mongoose";

export interface Comment {
    user: string;
    text: string;
}

export interface CommentDocument extends Comment, mongoose.Document {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
      },
    text:{
        type: String,
        required: true,
    },
    
},{timestamps: true}
); 


export default mongoose.model<CommentDocument>("Comment", commentSchema)