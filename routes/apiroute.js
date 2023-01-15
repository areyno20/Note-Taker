const path = require('path');
const fs = require('fs');

var uniid = require('uniqid');

module.exports = function(app) {
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    }
    );

    app.post('/api/notes', (req, res) => {
        let db = fs.readFileSync('./db/db.json');
        db = JSON.parse(db);
        let newNote = req.body;
        let userNote = {
            title: newNote.title,
            text: newNote.text,
            id: uniid()
        };
        db.push(userNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(db));
        res.json(db);
    });

    app.delete('/api/notes/:id', (req, res) => {
        let db = fs.readFileSync('./db/db.json');
        db = JSON.parse(db);
        let newDb = db.filter(note => note.id !== req.params.id);
        fs.writeFileSync('./db/db.json', JSON.stringify(newDb));
        res.json(newDb);
    }
    );
};
