const express = require('express');
const bcrypt = require('bcrypt');

const fileUploader = require('../config/cloudinary.config')

const User = require('../models/User');

const { authenticationSignup } = require('../authentication/authentication');

const router = express();

router.get('/signup', (req, res) => {
   res.render('signup');
});

router.post('/signup', fileUploader.single('userImage'), async (req, res) => {
    console.log(req.body);

    const { userName, userEmail, userPhone, userPassword, userImage } = req.body;

    const validationErrors = authenticationSignup(userName, userEmail, userPhone, userPassword, userImage);

    if (Object.keys(validationErrors).length > 0) {
        return res.render('signup', validationErrors);
    }

    try {

        const userFromDb = await User.findOne({ email: userEmail });

        if (userFromDb) {
            return res.render('signup', { userEmailError: ['Email já cadastrado!!!'] })
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const encryptedPassword = bcrypt.hashSync(userPassword, salt);

        await User.create({
            name: userName,
            image: req.file.path,
            email: userEmail,
            phone: userPhone,
            password: encryptedPassword,
        });

        res.redirect('/login');
    } catch (error) {
        console.log('ERRO NA ROTA /signup ==>>', error);
    }
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.post('/login',async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        const userFromDb = await User.findOne({ email: userEmail });

        if (!userFromDb) {
            return res.render('login', { userEmailError: 'Usuário ou senha incorretos', userPasswordError: 'Usuário ou senha incorretos' });
        }

        const isPasswordValid = bcrypt.compareSync(userPassword, userFromDb.password);

        if (!isPasswordValid) {
            return res.render('login', { userEmailError: 'Usuário ou senha incorretos', userPasswordError: 'Usuário ou senha incorretos' });
        }

        req.session.currentUser = userFromDb;

        res.redirect('/home');

    } catch (error) {
        console.log(error);
    }
});

router.get('/logout', ( req, res) => {
    req.session.destroy()
    
    res.redirect('/login')
});

router.get('/signup-professional', (req, res) => {
    res.render('signup-professional');
});



module.exports = router;