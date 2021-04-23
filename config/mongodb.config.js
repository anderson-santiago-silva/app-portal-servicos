const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI, 
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => {
        console.log('***Conectado ao banco de dados!***');
});
