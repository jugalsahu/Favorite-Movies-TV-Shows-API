import { model, Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

}, { timestamps: true })

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password.toString(), 12)
})
const UserModel = model("User", userSchema)

export default UserModel