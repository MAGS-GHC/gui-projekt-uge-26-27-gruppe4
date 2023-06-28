const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;
const mongoURI ='mongodb+srv://Daniel:DMS1997@atlascluster.by0nbvr.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'ViborgVFF';

let db;

async function startServer() {
  try {
    const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Route for the root path ('/') - Send index.html file as response
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/buy', (req, res) => {
    res.sendFile(path.join(__dirname, 'buy', 'index.html'));
  });

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'menu', 'index.html'));
});  

app.get('/support', (req, res) => {
  res.sendFile(path.join(__dirname, 'support', 'index.html'));
});  

app.get('/ticket', (req, res) => {
  res.sendFile(path.join(__dirname, 'ticket', 'index.html'));
});  
app.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'user', 'index.html'));
});  

app.use(express.static(__dirname));

startServer();
