const { Schema, model, Types } = require('mongoose');

const projectSchema = new Schema({
    title: { type: String },
    description: { type: String },
    image: { type: String, default: '/images/icon_prof.png' },
    executor: { type: Types.ObjectId, ref: 'Professional' },
},
{
    timestamps: true,
});

const Project = model('project', projectSchema);

module.exports = Project;
