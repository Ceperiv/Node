const {Schema, model} = require('mongoose');

const actionTokenSchema = new Schema({
    token: {type: String, required: true},
    tokenType: {type: String},
    my_user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Action_token', actionTokenSchema);
