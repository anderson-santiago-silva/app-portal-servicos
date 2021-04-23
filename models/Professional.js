const { Schema, model } = require('mongoose');

const professionalSchema = new Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    image: { type: String, default: '/images/icon_prof.png' },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    profession: { type: String },
    time_experience: { type: String },
    acting_region: { type: String },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    role: { type: String, default: 'professional' },
},
{
    timestamps: true,
});

const Professional = model('Professional', professionalSchema);

module.exports = Professional;
