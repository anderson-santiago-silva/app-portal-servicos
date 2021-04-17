const { Schema, model, Types } = require('mongoose');

const projectSchema = new Schema({
    title: { type: String },
    description: { type: String },
    image_project: { type: String, default: 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg' },
    executor: { type: Types.ObjectId, ref: 'Professional' },
},
{
    timestamps: true,
});

const Project = model('project', projectSchema);
module.exports = Project;
