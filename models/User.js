const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    role: { type: String, default: 'user' },
},
{
    timestamps: true,
});

const User = model('User', userSchema);

module.exports = User;
