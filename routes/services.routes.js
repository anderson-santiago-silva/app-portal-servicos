const express = require('express');

const Professional = require('../models/Professional');
const Project = require('../models/Project');


const router = express();

router.get('/', (req, res) => {
    //console.log('USER DENTRO DO COOKIE ===>', req.session.currentUser);//Validar prq os cookies não somem
    Professional.find({ profession: 'Marceneiro' }) //Deixar dinâmico o filtro de profissão
    .then(professionalDatabase => {
        //console.log(professionalDatabase);

        res.render('services', { professional: professionalDatabase });
    });
});

router.get('/projects/:projectId', (req, res) => {
    
    Project.find({ executor: '6078ce14f71847f981158691' }).populate('executor') //Deixa dinâmico o filtro de projetos. Não pelo metodo "findId" (tentar concatenar pela TemplateString como no exemplo /projects/${projectId})
    .then(projectDatabase => {
        //console.log(`O array é esse ==>>>`, projectDatabase);
        res.render('projects', { project: projectDatabase });
    });
});

router.get('/new', (req, res) => {
    res.render('newProject');
});

router.post('/new', (req, res) => {
    const { serviceTitle, serviceDescription, imageProject  } = req.body;

    const newProject = {
        title: serviceTitle,
        description: serviceDescription,
        image_project: imageProject,
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