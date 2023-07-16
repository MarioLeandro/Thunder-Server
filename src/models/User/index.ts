import mongoose from "mongoose";
import * as bcrypt from 'bcrypt'

export interface User {
    name: string;
    email: string;
    password: string;
    level: number;
    currentExperience: number;
}

export interface UserDocument extends User, mongoose.Document {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
}


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    picture:{
        type: String,
        unique: true,
        required: false,
    },
    level:{
        type: Number,
        unique: true,
        required: true,
    },
    currentExperience:{
        type: Number,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    
},{timestamps: true}
); 

userSchema.pre('save', async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword;

    return next();
})

userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model<UserDocument>("User", userSchema)