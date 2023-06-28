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
    dropTickets();
    generateTickets();
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



app.post('/usersVFF/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if email already exists in the database
      const existingUser = await db.collection('usersVFF').findOne({ email });
      if (existingUser) {
        // Email already exists
        res.status(400).json({ message: 'Email already exists' });
      } else {
        // Email does not exist, proceed with user registration
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create a new user object with the wallet attribute
        const newUser = {
          name,
          email,
          password: hashedPassword,
          seasoncard: false,        
        };
  
        // Save user information in the database
        await db.collection('usersVFF').insertOne(newUser);
        res.status(200).json({ message: 'User registered successfully' });
      }
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Could not register user' });
    }
  });

  app.post('/usersVFF/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user with the specified email in the database
      const user = await db.collection('usersVFF').findOne({ email });
      console.log('Fetched user:', user);
      if (user) {
        // Compare the provided password with the hashed password in the database
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          // Passwords match, login successful
          res.status(200).json({ message: 'Login successful' });
        } else {
          // Passwords do not match
          res.status(401).json({ message: 'Invalid login credentials' });
        }
      } else {
        // User not found
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Could not fetch user' });
    }
  });

  app.get('/usersVFF', async (req, res) => {
    try {
      // Get all users from the database
      const users = await db.collection('usersVFF').find().toArray();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ message: 'Could not get users' });
    }
  });

/*---------------------------------------------Tickets  --------------------------------------------------------*/

  app.post('/tickets', async (req, res) => {
    const { ticketName, amount } = req.body;
  
    try {
      // Create a new ticket object
      const newTicket = {
        ticketName,
        amount
      };
  
      // Insert the ticket into the 'tickets' collection
      await db.collection('tickets').insertOne(newTicket);
      res.status(200).json({ message: 'Ticket inserted successfully' });
    } catch (error) {
      console.error('Error inserting ticket:', error);
      res.status(500).json({ message: 'Could not insert ticket' });
    }
  });


  app.get('/tickets', async (req, res) => {
    try {
      // Get all tickets from the 'tickets' collection
      const tickets = await db.collection('tickets').find().toArray();
      res.status(200).json(tickets);
    } catch (error) {
      console.error('Error getting tickets:', error);
      res.status(500).json({ message: 'Could not get tickets' });
    }
  });

  /*---------------------------------------------Tickets  --------------------------------------------------------*/



app.use(express.static(__dirname));

startServer();




async function generateTickets() {
    try {
      const count = await db.collection('tickets').countDocuments();
  
      if (count === 0) {
        const tickets = [];
        const gameName = 'Viborg VFF - Randers FC';
        const gamePrice = 200
  
        for (let i = 1; i <= 20; i++) {
          const ticket = {
            id: i,
            gameName,
            gamePrice
          };
          tickets.push(ticket);
        }
  
        await db.collection('tickets').insertMany(tickets);
        console.log('Tickets created successfully');
      } else {
        console.log('Tickets already exist in the database');
      }
    } catch (error) {
      console.error('Error generating tickets:', error);
    }
  }

   function dropTickets() {
    try {
      // Delete all documents from the 'tickets' collection
      const result = db.collection('tickets').deleteMany({});
      console.log(`${result.deletedCount} tickets have been dropped from the collection`);
    } catch (error) {
      console.error('Error dropping tickets:', error);
    }
  }
  

/*   async function createTicketCollection() {
    try {
      await db.createCollection('tickets');
      console.log('Ticket collection created');
    } catch (error) {
      console.error('Error creating ticket collection:', error);
    }
  }
 */
  