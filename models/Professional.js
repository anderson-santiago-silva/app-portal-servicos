const { Schema, model } = require('mongoose');

const professionalSchema = new Schema({
    image: { type: String, default: 'https://institutouniversal.vteximg.com.br/arquivos/ids/157031-1000-1000/image_instalador_sistemas_de_alarme.jpg?v=635368922220070000' },
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    birthDate: { type: Date, required: true },
    profession: { type: String, required: true },
    time_experience: { type: String, required: true },
    acting_region: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
},
{
    timestamps: true,
});

const Professional = model('Professional', professionalSchema);
module.exports = Professional;
