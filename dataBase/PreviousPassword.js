const {Schema, model} = require('mongoose');

const previousPasswordSchema = new Schema({
    password: {type: String, required: true},
    my_user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Previous_password', previousPasswordSchema);