const Land = require('../models/landModel');

// Create a new land
exports.createLand = async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!req.body.coordinates) {
      throw new Error('Coordinates are missing');
    }
    const coordinates = JSON.parse(req.body.coordinates);

    const newLand = new Land({
      name: req.body.name,
      description: req.body.description,
      imageUrl,
      price: req.body.price,
      type: req.body.type,
      availabilityStatus: req.body.availabilityStatus,
      ownershipType: req.body.ownershipType,
      coordinates,
      userId: req.body.user_id,
    });

    const savedLand = await newLand.save();
    res.status(201).json(savedLand);
  } catch (err) {
    console.error('Error creating land:', err);
    res.status(500).send('Error creating land');
  }
};

// Get lands with filters
exports.getLands = async (req, res) => {
  try {
    const { type, availabilityStatus, ownershipType, areaRange, center } = req.query;
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
    const mapCenter = center ? center : [22.94275737438829, 89.18402516392086];

    if (areaRange) {
      // Convert areaRange from meters to radians
      const radiusInMeters = parseInt(areaRange, 10);
      const radiusInRadians = radiusInMeters / 6378137; // Earth's radius in meters
    
      filter.coordinates = {
        $geoWithin: {
          $centerSphere: [mapCenter, radiusInRadians], // Radius in radians
        },
      };
    }

    const lands = await Land.find(filter).exec();
    res.json(lands);
  } catch (error) {
    console.error("Error fetching lands", error);
    res.status(500).send("Error fetching lands");
  }
};
