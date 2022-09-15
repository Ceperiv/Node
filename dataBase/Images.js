const {Schema, model} = require('mongoose');

const imageSchema = new Schema({
    image: {type: String, required: true},
    my_user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Image', imageSchema);