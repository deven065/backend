const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/paytm");

// Create a schema for user
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 3,
        maxLength : 30
    },
    password : {
        type : String,
        required : true,
        minLength : 8,
    },
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    }
});

// Create a Account Schema
const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId, //Refrence to user model
        ref : "User",
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
});

// Create a model from  Schema
const Account = mongoose.model("Account", accountSchema)
const User = mongoose.model("User", userSchema);

module.exports = {
    User,
    Account
};