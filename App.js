const express = require('express');
const db = require('./Database');
const Notes = require('./Notes');
const app = express();
const path = require('path');
const Users = require('./Users');

Notes.sync();
Users.sync();
app.use(express.json());



app.post('/auth', (req, res, next) => {

    Users.findAll().then((result) => {

        for (let i = 0; i < result.length; i++) {

            if (req.body.username === result[i].username && req.body.password === result[i].password) {

                res.send({authorized: true});

            } 


        }


    });


});


app.post('/getNotes', (req, res, next) => {
   
    Notes.findAll({ where: { username: req.body.username } }).then((data) => { res.send(data); console.log(data); });
});


app.post('/addNote', (req, res, next) => {

    Notes.create({ notes: req.body.text, username: req.body.username }).then(result => { res.send(result)});
    


});


app.post('/endTheDay', (req, res, next) => {

    try {
        Notes.destroy({ where: { username: req.body.username } });
        Notes.sync();
    } catch (err) {
        console.log(err.message);
    }
   



});

app.post('/completeStatus', (req, res, next) => {

    Notes.findOne({ where: {id: req.body.id, username: req.body.username} }).then((result) => { Notes.update({ iscomplete: !result.iscomplete }, { where: { id: req.body.id, username: req.body.username } }); console.log(result); });
    


});


app.post('/getNoteStatus', (req, res, next) => {

    try {
        Notes.findOne({ where: { id: req.body.id, username: req.body.username } }).then((result) => { res.send(result.iscomplete);  });
                                                                                                                                                                                                                                                                
    } catch (err) {
        console.log(err.message);
        
    }
    


});


app.use('/home', (req, res, next) => {

    res.redirect('/');
});

app.use('/', express.static(path.join(__dirname, 'daily-notes', 'build')));





app.listen(5000);













