const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/WP_project',{
    useNewUrlParser:true,
    autoIndex: false,
    useUnifiedTopology:true
}).then(()=>{
    // console.log("Connected to the DataBase");
}).catch((e)=>{
    // console.log(e);
})

const userSchema = mongoose.Schema({
    UserName:{
        type:String,
        unique:true,
        required:true,
    },
    Email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
})

// encripting passwords

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function (plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};
const userModel = mongoose.model("UserData",userSchema);
module.exports = userModel;
