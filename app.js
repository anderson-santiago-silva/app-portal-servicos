require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

const homeRoutes = require('./routes/home.routes');
const authRoutes = require('./routes/auth.routes');
const servicesRoutes = require('./routes/services.routes');

// const sessionConfig = require('./config/session.config');

const app = express();

// sessionConfig(app);

require('./config/mongodb.config');

app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');

app.use('/', homeRoutes);
app.use('/', authRoutes);

// app.use((req, res, next) => {
//     if (req.session.currentUser) {
//         return next();
//     }
//     res.redirect('/login');
// });


app.use('/services', servicesRoutes);

app.use((req, res, next) => {
    res.status(404);
    res.render('not-found', { layout: false});
});

app.use((err, req, res, next) => {
    console.log('ERROR', req.method, req.path, err);

    if(!res.henderSent) {
        res.status(500);
        res.render('error', { layout: false})  //Revisar este erro (Aula 10 1h 15 min)
    }
});


app.listen(3000, () => console.log('App rodando na porta 3000'));