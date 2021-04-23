const express = require('express');
const bcrypt = require('bcrypt');

const fileUploader = require('../config/cloudinary.config')

const User = require('../models/User');
const Professional = require('../models/Professional');

const { authenticationSignup } = require('../authentication/authentication');

const router = express();

router.get('/signup', (req, res) => {
   res.render('signup');
});

router.post('/signup', fileUploader.single('userImage'), async (req, res) => {
    //console.log(req.body);

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

router.get('/signup-professional', (req, res) => {
    res.render('signup-professional');
});

router.post('/signup-professional', fileUploader.single('userImage'), async (req, res) => {
    //console.log('Este é o array ==>>', req.body);
 
    const { userName, userEmail, userPhone, userPassword, userImage, userProfession, userExperience, userRegion  } = req.body;
     
        try {
            
         const userFromDb = await Professional.findOne({ email: userEmail });
         
         if (userFromDb) {
             return res.render('signup-professional', { userEmailError: ['Email já cadastrado!!!'] })
            }
 
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const encryptedPassword = bcrypt.hashSync(userPassword, salt);
            
            await Professional.create({
                name: userName,
                image: req.file.path,
                email: userEmail,
                phone: userPhone,
                profession: userProfession,
                time_experience: userExperience,
                acting_region: userRegion,
                password: encryptedPassword,
            });
            
            res.redirect('/login');
        } catch (error) {
            console.log('ERRO NA ROTA /signup ==>>', error);
        }
    });

router.post('/login', async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        //console.log(req.body);
        
        const professionalFromDb = await Professional.findOne({ email: userEmail });
        const userFromDb = await User.findOne({ email: userEmail });
                
        if (!userFromDb && !professionalFromDb) {
            return res.render('login', { userEmailError: 'Usuário ou senha incorretos', userPasswordError: 'Usuário ou senha incorretos' });
        }

        const user = userFromDb || professionalFromDb
        //console.log(user);
        const isPasswordValid = bcrypt.compareSync(userPassword, user.password);

        if (!isPasswordValid) {
            return res.render('login', { userEmailError: 'Usuário ou senha incorretos', userPasswordError: 'Usuário ou senha incorretos' });
        }

        req.session.currentUser = user;

        if (user.role === 'professional') {
            res.redirect(`/services/projects/${req.session.currentUser._id}`)
        } else {
            res.redirect('/');
        }

    } catch (error) {
        console.log(error);
    }
});
 
 router.get('/login', (req, res) => {
     res.render('login')
    });
    
router.get('/logout', ( req, res) => {
    req.session.destroy()
    
    res.redirect('/')
});
  
module.exports = router;
