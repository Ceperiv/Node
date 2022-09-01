const {Schema, model} = require('mongoose');

const carSchema = new Schema({
    name: {type: String, trim: true, required: true},
    year: {type: Number, required: true},
    model: {type: String, trim: true, lowercase: true, default: null},
    my_user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Cars', carSchema);