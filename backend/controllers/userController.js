import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


// Create Token

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


// Signup User 
const signupUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a password of at least 8 characters" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Creating user
        const newUser = new userModel({
            name,
            password: hashPassword,
            email
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


// Login User
const loginUser = async( req, res) => {
    const {email, password} = req.body;

    try {
        // Validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Checking if user exists in database
        const user = await userModel.findOne({email})

        if(!user) {
            res.json({success: false, message: "User doesn't exists"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            res.json({success: false, message:"Incorrect Password"});
        }

        const token = createToken(user._id)
        res.status(200).json({success: true, token});


    } catch (error) {
        
    }
}


export {loginUser, signupUser};