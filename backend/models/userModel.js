import mongoose from "mongoose"

const UserSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    }

}, {minimize:false}) // this ensure that empty cart will not be removed from database as mongoose does that... 

const userModel = mongoose.models.user || mongoose.model("user", UserSchema);
export default userModel;