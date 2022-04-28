const express = require('express');
const db = require('./Database');
const Notes = require('./Notes');
const app = express();
const path = require('path');


Notes.sync();

app.use(express.json());
app.use('/getNotes', (req, res, next) => {
   
    Notes.findAll().then((data) => { res.send(data); console.log(data); });
});


app.post('/addNote', (req, res, next) => {

    Notes.create({ notes: req.body.text }).then(result => { res.send(result)});
    


});


app.get('/endTheDay', (req, res, next) => {

    Notes.drop();
    Notes.sync();



});

app.post('/completeStatus', (req, res, next) => {

    Notes.findByPk(req.body.id).then((result) => { Notes.update({ iscomplete: !result.iscomplete }, { where: { id: result.id } }); console.log(result); });
    


});


app.post('/getNoteStatus', (req, res, next) => {

    try {
        Notes.findByPk(req.body.id).then((result) => { res.send(result.iscomplete); console.log(result.iscomplete); });
                                                                                                                                                                                                                                                                
    } catch (err) {
        console.log(err.message);
        
    }
    


});


app.use(express.static(path.join(__dirname, 'daily-notes', 'build')));

app.listen(5000);













