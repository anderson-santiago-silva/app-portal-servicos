const express = require('express');

const router = express();

router.get('/', (req, res) => {
   
    const isProfessional = req.session.currentUser && req.session.currentUser.role === 'professional';

    res.render('home', { user: req.session.currentUser, isProfessional });
});

module.exports = router;
