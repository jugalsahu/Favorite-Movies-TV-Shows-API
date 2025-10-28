import { Request, Response } from "express";
import UserModel from "../model/user.model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { CatchError, TryError } from "../util/error";


interface PayloadInterface {
    id: mongoose.Types.ObjectId
    fullname: string
    email: string
    mobile: string
}

const generateToken = async (payload: PayloadInterface) => {
    const accessToken = jwt.sign(payload, process.env.AUTH_SECRET!, { expiresIn: "10m" })
    return accessToken
}

export const signup = async (req: Request, res: Response) => {
    try {
        await UserModel.create(req.body)
        res.json({ message: "Signup success" })
    } catch (error) {
        CatchError(error, res)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password)
            throw TryError("Email and password fields are required", 400)

        const user = await UserModel.findOne({ email })

        if (!user)
            throw TryError("User is not found please signup first", 404)

        const isLogin = await bcrypt.compare(password, user.password)

        if (!isLogin)
            throw TryError("Invalid Creadintial", 401)

        const payload = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile
        }
        const options = {
            httpOnly: true,
            maxAge: (10 * 60) * 1000,
            secure: false,
            domain: "localhost"
        }
        const accessToken = await generateToken(payload)
        res.cookie("accessToken", accessToken, options)

        res.json({ message: "login success" })

    } catch (error) {
        CatchError(error, res)
    }
}

export const getSession = async (req: Request, res: Response) => {
    try {
        const accessToken = req.cookies.accessToken

        if (!accessToken)
            throw TryError("Invalid session", 401)

        const session = await jwt.verify(accessToken, process.env.AUTH_SECRET!)
        res.json(session)
    } catch (error) {
        CatchError(error, res)
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({}, { _id: 1, fullname: 1, email: 1 }).sort({fullname: 1})
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users" })
    }
}