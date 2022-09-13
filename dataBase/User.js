const {Schema, model} = require('mongoose');
const tokenService = require("../services/token.service");

const userSchema = new Schema({
    name: {type: String, trim: true, required: true},
    age: {type: Number, default: 18},
    email: {type: String, trim: true, lowercase: true, required: true, unique: true},
    password: {type: String, required: true},
    my_cars: {
        type: [Schema.Types.ObjectId],
        ref: 'Cars',
    },
}, {
    timestamps: true,
    versionKey: false
});
userSchema.statics = {
    testStatic() {
        console.log(this)
    },

    async createUserWithHashPassword(userObj = {}) {
        const hashPassword = await tokenService.hashPassword(userObj.password);
        return  this.create({...userObj, password: hashPassword});
    }
};

userSchema.methods = { // for single record // THIS - RECORD
    testMethod() {
        console.log(this);
    },

   async checkIsPasswordSame(password){
        await tokenService.comparePassword(password, this.password);
    }
};

module.exports = model('Users', userSchema);