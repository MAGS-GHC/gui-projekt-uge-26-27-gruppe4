const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
const cors = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(
  { origin: '*'},
  { method: "GET,HEAD,PUT,PATCH,POST,DELETE"}
  ))

const PORT = 4000;
const mongoURI ='mongodb+srv://Daniel:DMS1997@atlascluster.by0nbvr.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'ViborgVFF';

let db;

async function startServer() {
  try {
    const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    /* dropMatches(); */
   /*  generateMatches(); */
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

app.post('/usersVFF/register', async (req, res) => {
  const { name, email, number, password } = req.body;

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
        number,
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

app.post('/matches', async (req, res) => {
  const { matchName, matchDay, matchDate,  matchTime, sections } = req.body;

  try {
    // Create a new match object
    const newMatch = {
      matchName,
      matchDay,
      matchDate,
      matchTime,
      sections,
    };

    // Insert the match into the 'matches' collection
    await db.collection('matches').insertOne(newMatch);
    res.status(200).json({ message: 'Match inserted successfully' });
  } catch (error) {
    console.error('Error inserting match:', error);
    res.status(500).json({ message: 'Could not insert match' });
  }
});

app.get('/matches', async (req, res) => {
  try {
    // Get all matches from the 'matches' collection
    const matches = await db.collection('matches').find().toArray();
    res.status(200).json(matches);
  } catch (error) {
    console.error('Error getting matches:', error);
    res.status(500).json({ message: 'Could not get matches' });
  }
});

/* async function generateMatches() {
  try {
    const count = await db.collection('matches').countDocuments();

    
      const matches = [
        {
          matchName: 'Viborg FF - FCM',
          matchDay: 'SØN',
          matchDate: '17-09-2023',
          matchTime: null,
          sections: [
            {
              sectionName: 'M',
              tickets: [
                {
                  price: 100,
                  id: new ObjectId(),
                  seat: {
                    row: 1,
                    seatNr: 1,
                  },
                },
                {
                  price: 100,
                  id: new ObjectId(),
                  seat: {
                    row: 1,
                    seatNr: 2,
                  },
                },
                {
                  price: 100,
                  id: new ObjectId(),
                  seat: {
                    row: 1,
                    seatNr: 3,
                  },
                },
              ],
            },
            {
              sectionName: 'M Fan',
              tickets: [],
            },
            {
              sectionName: 'L',
              tickets: [],
            },
            {
              sectionName: 'K',
              tickets: [],
            },
            {
              sectionName: 'J Nedre',
              tickets: [],
            },
            {
              sectionName: 'I Nedre',
              tickets: [],
            },
            {
              sectionName: 'H Nedre',
              tickets: [],
            },
            {
              sectionName: 'G',
              tickets: [],
            },
          ],
        },
        {
          matchName: 'Viborg VFF - Randers FC',
          matchDay: '30-06-2023',
          sections: [
            {
              sectionName: 'M Fan',
              tickets: [
                {
                  price: 120,
                  id: new ObjectId(),
                  seat: {
                    row: 'B',
                    seatNr: 1,
                  },
                },
                {
                  price: 120,
                  id: new ObjectId(),
                  seat: {
                    row: 'B',
                    seatNr: 2,
                  },
                },
                {
                  price: 120,
                  id: new ObjectId(),
                  seat: {
                    row: 'B',
                    seatNr: 3,
                  },
                },
              ],
            },
            {
              sectionName: 'Section 3',
              tickets: [
                {
                  price: 80,
                  id: new ObjectId(),
                  seat: {
                    row: 'A',
                    seatNr: 1,
                  },
                },
                {
                  price: 80,
                  id: new ObjectId(),
                  seat: {
                    row: 'A',
                    seatNr: 2,
                  },
                },
                {
                  price: 80,
                  id: new ObjectId(),
                  seat: {
                    row: 'A',
                    seatNr: 3,
                  },
                },
              ],
            },
            {
              sectionName: 'Section 4',
              tickets: [
                {
                  price: 90,
                  id: new ObjectId(),
                  seat: {
                    row: 'B',
                    seatNr: 1,
                  },
                },
                {
                  price: 90,
                  id: new ObjectId(),
                  seat: {
                    row: 'B',
                    seatNr: 2,
                  },
                },
                {
                  price: 90,
                  id: new ObjectId(),
                  seat: {
                    row: 'B',
                    seatNr: 3,
                  },
                },
              ],
            },
          ],
        },
      ];

      // Generating tickets for sections with 600 tickets
      for (let i = 0; i < matches.length; i++) {
        const sections = matches[i].sections;
      
        for (let j = 0; j < sections.length; j++) {
          const section = sections[j];
          const sectionName = section.sectionName;
      
          if (
            sectionName === 'M' ||
            sectionName === 'L' ||
            sectionName === 'J Nedre' ||
            sectionName === 'I Nedre' ||
            sectionName === 'H Nedre'
          ) {
            for (let row = 1; row <= 18; row++) {
              for (let seatNr = 1; seatNr <= 33; seatNr++) {
                section.tickets.push({
                  price: 100,
                  seat: {
                    row: row,
                    seatNr: seatNr,
                  },
                });
              }
            }
          } else if (sectionName === 'K') {
            for (let row = 1; row <= 18; row++) {
              for (let seatNr = 1; seatNr <= 13; seatNr++) { 
                section.tickets.push({
                  price: 200, 
                  seat: {
                    row: row,
                    seatNr: seatNr,
                  },
                });
              }
            }
          } else if (sectionName === 'G') {
            for (let row = 1; row <= 18; row++) {
              for (let seatNr = 1; seatNr <= 10; seatNr++) { 
                section.tickets.push({
                  price: 150, 
                  seat: {
                    row: row,
                    seatNr: seatNr,
                  },
                });
              }
            }
          } else if (sectionName === 'M Fan') {
            for (let ticketIndex = 1; ticketIndex <= 600; ticketIndex++) {
              section.tickets.push({
                price: 100,
                seat: null,
              });
            }
          }
        }
      }
      await db.collection('matches').insertMany(matches);
      console.log('Matches created successfully');

  } catch (error) {
    console.error('Error generating matches:', error);
  }
} */


/* function dropMatches() {
  try {
    // Delete all documents from the 'matches' collection
    const result = db.collection('matches').deleteMany({});
    console.log(`${result.deletedCount} matches have been dropped from the collection`);
  } catch (error) {
    console.error('Error dropping matches:', error);
  }
} */

app.use(express.static(__dirname));

startServer();
