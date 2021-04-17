// const mongoose = require('mongoose');

// const User = require('./models/User');
// const Professional = require('./models/Professional');
// const Project = require('./models/Project');

// const newProfessional = {
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Ptcw3ynGODt0dshGX6hURIqaOyEDW6f_P6am3YyBhBl00XagDdzAN2cws28rkFcUTPM&usqp=CAU',
//     name: 'Mathias',
//     birthDate: new Date(6, 11, 2021),
//     profession: 'Marceneiro',
//     time_experience: '1 mês',
//     acting_region: 'Grande São Paulo',
//     email: 'mathias@gmail.vom',
//     phone: '11-91234-5678',
//     password: '123',
// };

// mongoose.connect('mongodb://localhost:27017/portal-service-database').then(() => {
//     console.log('***Conectado ao banco de dados***');

//     Professional.create(newProfessional).then(() => {
//         console.log('Professional cadastrado com sucesso!!!');
//     }).catch(err => {
//         console.log('Erro ao cadastrar usuário', err);
//     });

// }).catch( error => {
//     console.log(error);
// });

