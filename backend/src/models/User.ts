import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export enum UserTypes {
    Student = "stud",
    Professor = "prof",
    TA = "ta",
    Admin = "admin",
    Sysop = "sysop",
}

export interface IUser extends mongoose.Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    userType: Array<UserTypes>,
    comparePassword(entredPassword: string): Promise<Boolean> 
}

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    userType: {
        type: Array,
        required: true,
    }
}, {
    timestamps: true
})

export interface IUserRequest extends Request {
    user?: any
}

UserSchema.pre("save", async function(next) {
    const user = this as IUser;
    if(!user.isModified("password")) return next();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
})

UserSchema.methods.comparePassword = function(enteredPassword: string) {
    const user = this as IUser;
    return bcrypt.compareSync(enteredPassword, user.password);
}

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
