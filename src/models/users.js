const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    date_of_birth: {
        type: Date,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(val) {
            if (!validator.isEmail(val)) throw new Error("Email is invalid.");
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    profileImage: {
        type: String
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamp: true
});

userSchema.methods.toJSON = function(){
    const updatedUser = this.toObject();
    updatedUser.profileImage = '/users/'+updatedUser.profileImage;
    updatedUser.date_of_birth = moment(updatedUser.date_of_birth).format('YYYY-MM-DD');
    delete updatedUser.tokens;
    delete updatedUser.password;
    return updatedUser;
};

userSchema.methods.generateToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWTTOKEN);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
};

userSchema.statics.confirmCredential = async function (email, password) {
    const user = await User.findOne({ email });
    if(!user) throw new Error("Email Not Registered");
    const passMatch = await bcrypt.compare(password,user.password);
    if(!passMatch) throw new Error("Password Does Not Match");
    return user;
};

userSchema.pre('save', async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;