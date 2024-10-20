const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files (for images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/real-estate')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Define the schema
const landSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  price: Number,
  type: { type: String, enum: ['Residential', 'Commercial', 'Farming', 'Fish Farm'] },
  availabilityStatus: { type: String, enum: ['For Sale', 'For Rent', 'Sold', 'Leased', 'Auction'] },
  ownershipType: { type: String, enum: ['Private', 'Government', 'Common'] },
  coordinates: [[Number]],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Land = mongoose.model('Land', landSchema);

const userSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});
const upload = multer({ storage });

app.post('/api/createUser', async (req, res) => {
  const newUser = new User();
  
  try {
    await newUser.save();
    res.json({ user_id: newUser._id });
  } catch (err) {
    console.error('Error creating user', err);
    res.status(500).send('Error creating user');
  }
});


// Route to get lands with optional filters
app.get('/api/lands', async (req, res) => {
  try {
    const { type, availabilityStatus, ownershipType, areaRange } = req.query;
    console.log('type: ', type);
    console.log('availabilityStatus: ', availabilityStatus);
    console.log('ownershipType: ', ownershipType);
    console.log('areaRange:', areaRange);
    const filter = {};

    // Check if type is an array, if so use it directly. Otherwise, split by comma if it's a string.
    if (type && Array.isArray(type)) {
      filter.type = { $in: type };
    } else if (type) {
      filter.type = { $in: type.split(",") };
    }

    // Handle availabilityStatus filter similarly.
    if (availabilityStatus && Array.isArray(availabilityStatus)) {
      filter.availabilityStatus = { $in: availabilityStatus };
    } else if (availabilityStatus) {
      filter.availabilityStatus = { $in: availabilityStatus.split(",") };
    }

    // Handle ownershipType filter similarly.
    if (ownershipType && Array.isArray(ownershipType)) {
      filter.ownershipType = { $in: ownershipType };
    } else if (ownershipType) {
      filter.ownershipType = { $in: ownershipType.split(",") };
    }

    // Get lands within the specified area range (500m or 1000m) of map center
    const center = req.query.center ? JSON.parse(req.query.center) : [22.94275737438829, 89.18402516392086];

    if (areaRange) {
      // Assuming coordinates are stored as [latitude, longitude]
      const radius = parseInt(areaRange, 10);
      filter.coordinates = {
        $geoWithin: {
          $centerSphere: [center, radius / 3963.2], // Radius in miles
        },
      };
    }

    const lands = await Land.find(filter).exec();
    res.json(lands);
  } catch (error) {
    console.error("Error fetching lands", error);
    res.status(500).send("Error fetching lands");
  }
});

// Route to create a new land with image upload
app.post('/api/lands', upload.single('image'), async (req, res) => {
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const newLand = new Land({
    name: req.body.name,
    description: req.body.description,
    imageUrl,
    price: req.body.price,
    type: req.body.type,
    availabilityStatus: req.body.availabilityStatus,
    ownershipType: req.body.ownershipType,
    coordinates: JSON.parse(req.body.coordinates),
    userId: req.body.user_id,
  });

  const result = await newLand.save()
    .then(() => console.log('Land created'))
    .catch(err => console.error('Error saving land', err));

    console.log('--- result:', result);

  res.json(newLand);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
