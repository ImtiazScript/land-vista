const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB without deprecated options
mongoose.connect('mongodb://localhost:27017/real-estate')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));


const landSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    price: Number,
    type: { type: String, enum: ['Residential', 'Commercial', 'Farming', 'Fish Farm'] },
    availabilityStatus: { type: String, enum: ['For Sale', 'For Rent', 'Sold', 'Leased', 'Auction'] },
    ownershipType: { type: String, enum: ['Private', 'Government', 'Common'] },
    coordinates: [[Number]],
  });

  const Land = mongoose.model('Land', landSchema);

// Routes
app.get('/api/lands', async (req, res) => {
  const lands = await Land.find();
  res.json(lands);
});

app.post('/api/lands', async (req, res) => {
const newLand = new Land({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    type: req.body.type,
    availabilityStatus: req.body.availabilityStatus,
    ownershipType: req.body.ownershipType,
    coordinates: req.body.coordinates
  });
  await newLand.save().then(() => console.log('Land created'));
  res.json(newLand);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
