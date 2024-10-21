const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoDbUri = 'mongodb+srv://emtiaj2011:<Uj2QRYOGpzqDhI6g>@real-estate.corei.mongodb.net/?retryWrites=true&w=majority&appName=real-estate';
  try {
    // await mongoose.connect('mongodb://localhost:27017/real-estate', {
    await mongoose.connect(mongoDbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
