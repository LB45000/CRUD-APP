const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv'); 
dotenv.config(); 
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

const uri = process.env.DB_URI; 

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('test');
    const usersCollection = db.collection('users');

    app.get('/', (req, res) => {
      usersCollection.find().toArray()
        .then(results => res.render('index.ejs', { users: results }))
        .catch(error => console.error(error));
    });

    app.post('/users', (req, res) => {
      usersCollection.insertOne(req.body)
        .then(result => res.redirect('/'))
        .catch(error => console.error(error));
    });

    app.put('/users', (req, res) => {
      usersCollection.findOneAndUpdate(
        { username: req.body.username },
        { $set: { password: req.body.newPassword } },
        { upsert: false }
      )
      .then(result => res.json('Success'))
      .catch(error => console.error(error));
    });

    app.delete('/users', (req, res) => {
      usersCollection.deleteOne(
        { username: req.body.username }
      )
      .then(result => res.json('Deleted user'))
      .catch(error => console.error(error));
    });
  })
  .catch(error => console.error(error));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
