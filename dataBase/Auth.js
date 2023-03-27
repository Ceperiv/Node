const {Schema, model} = require('mongoose');

const authSchema = new Schema({
    access_token: {type: String, required: true},
    refresh_token: {type: String, required: true},
    my_user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Auth', authSchema);