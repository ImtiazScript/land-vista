const Land = require('../models/landModel');

// Create a new land
exports.createLand = async (req, res) => {
  try {
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

    if (type) filter.type = { $in: type.split(',') };
    if (availabilityStatus) filter.availabilityStatus = { $in: availabilityStatus.split(',') };
    if (ownershipType) filter.ownershipType = { $in: ownershipType.split(',') };

    if (areaRange && center) {
      const centerCoords = JSON.parse(center);
      const radius = parseInt(areaRange, 10);
      filter.coordinates = {
        $geoWithin: {
          $centerSphere: [centerCoords, radius / 3963.2],
        },
      };
    }

    const lands = await Land.find(filter);
    res.status(200).json(lands);
  } catch (error) {
    console.error('Error fetching lands:', error);
    res.status(500).send('Error fetching lands');
  }
};
