const express = require('express');

const Professional = require('../models/Professional');
const Project = require('../models/Project');

const fileUploader = require('../config/cloudinary.config')


const router = express();

router.get('/', (req, res) => {
    
    //console.log('USER DENTRO DO COOKIE ===>', req.session.currentUser);//Validar prq os cookies não somem
    Professional.find() //Deixar dinâmico o filtro de profissão
    .then(professionalDatabase => {
        res.render('services', { professional: professionalDatabase });
    });
});

router.get('/projects/:projectId', (req, res) => {
    
        
    Project.find({ executor: req.params.projectId }).populate('executor') //colocar uma rota apenas para os clientes sem o executor dentro do objeto
    .then(projectDatabase => {
        res.render('projects', { project: projectDatabase });
    });
});

router.get('/new', (req, res) => {
    res.render('newProject');
});

router.post('/new', fileUploader.single('imageProject'), (req, res) => {
    const { serviceTitle, serviceDescription } = req.body;

    const newProject = {
        title: serviceTitle,
        description: serviceDescription,
        image: req.file.path,
        executor: '6078eab2a3fe35c8b5550e35', // Deixar dinâmico o executor conforme login
    };

    Project.create(newProject)
    .then(() => {
        res.redirect('/services/projects/6078eab2a3fe35c8b5550e35')// Deixar dinâmico o enderço (ID) da lista do executor
    })
    .catch(error => console.log(error));
});

router.post('/projects/edit/:projectId', (req, res) => {
    const { serviceTitle, serviceDescription, imageProject } = req.body;
    const { projectId } = req.params;

    Project.findByIdAndUpdate({ title: serviceTitle, description: serviceDescription, image_project: imageProject })
    .then(() => {
        res.redirect(`/projects/${projectId}`); // Testar esta rota depois que tudo estiver dinâmico (Aula 10 2h 30 min)
    })
    .catch(error => console.log(error));

});


///INCLUIR O DELETAR PROJETOS



module.exports = router;