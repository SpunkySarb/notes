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

    Users.findOne({ where: {username: req.body.username, password: req.body.password}}).then((result) => {

        if (result == null) {
            res.send({ authorized: false });
        } else {
            res.send({ authorized: true });
        }

       
    });


});


app.post('/register', (req, res, next) => {

    try {
        Users.findOne({ where: { username: req.body.username } }).then(result => {


            if (result == null) {
                Users.create({ username: req.body.username, password: req.body.password }).then(res.send({ userCreated: true }));

            } else {

                res.send({ userCreated: false });



            }


        });

    } catch (err) {
        console.log(err.message);
    }
   


});

app.post('/getNotes', (req, res, next) => {
    try {
        Notes.findAll({ where: { username: req.body.username } }).then((data) => { res.send(data); console.log("THIS IS THE DATA",data); });
        
    } catch (err) {
        console.log(err.message);
    }
   
});


app.post('/addNote', (req, res, next) => {

    Notes.create({ notes: req.body.text, username: req.body.username }).then(result => { res.send(result)});
    


});


app.post('/deleteNote',  (req, res, next) => {

    Notes.destroy({ where: { username: req.body.username, id: req.body.id } }).then((data) => { res.send({nothing: "nada"}); console.log(" this is data",data); });
});

app.post('/updateNote',  (req, res, next) => {
    console.log(req.body.notes)
    Notes.update({ notes: req.body.notes }, { where: { username: req.body.username, id: req.body.id } }).then(data => { res.send(data); console.log(" this is data", data); });

   
});





app.post('/endTheDay', (req, res, next) => {

    try {
        Notes.destroy({ where: { username: req.body.username } }).then(res.send({destroyed:true}));
        Notes.sync();
    } catch (err) {
        console.log(err.message);
    }
   



});

app.post('/completeStatus', (req, res, next) => {

    try {
        Notes.findOne({ where: { id: req.body.id, username: req.body.username } }).then((result) => { Notes.update({ iscomplete: !result.iscomplete }, { where: { id: req.body.id, username: req.body.username } }); console.log(result); });

    } catch (err) {
        res.redirect('/');
    }

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





app.listen(process.env.PORT || 5000);



// d









