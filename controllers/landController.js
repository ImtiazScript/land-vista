const Land = require('../models/landModel');

// Create a new land mapping
exports.createLand = async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!req.body.coordinates) {
      throw new Error('Coordinates are missing');
    }
    const coordinates = JSON.parse(req.body.coordinates);
    // converting to [lng, lat] format to support mongodb's geospacial query
    const rearrangedCoordinates = coordinates.map(coord => [coord[1], coord[0]]);

    const newLand = new Land({
      name: req.body.name,
      description: req.body.description,
      imageUrl,
      price: req.body.price,
      type: req.body.type,
      availabilityStatus: req.body.availabilityStatus,
      ownershipType: req.body.ownershipType,
      coordinates: rearrangedCoordinates,
      userId: req.body.user_id,
    });

    const savedLand = await newLand.save();
    // Convert coordinates  to support react-leaflet's polygon requirements
    savedLand.coordinates = savedLand.coordinates.map(coord => [coord[1], coord[0]])
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
    // const filter = { isDeleted: false };
    const filter = { };

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

    // Get lands within the specified area range (1000m or 10000m) of map center
    const [lat, lng] = center || [23.843898583121252, 90.50869166851045];
    const mapCenter = [lng, lat]; // MongoDB expects [longitude, latitude]

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

    // Convert coordinates for each land entry to support react-leaflet's polygon requirements
    const formattedLands = lands.map(land => {
      return {
        ...land._doc, // Spread the existing land properties
        coordinates: land.coordinates.map(coord => [coord[1], coord[0]]) // Convert from [lng, lat] to [lat, lng]
      };
    });

    res.json(formattedLands);
  } catch (error) {
    console.error("Error fetching lands", error);
    res.status(500).send("Error fetching lands");
  }
};

// Soft delete a created land
exports.deleteLand = async (req, res) => {
  try {
    const { landId } = req.params;

    // Check if the landId exists
    const land = await Land.findById(landId);
    if (!land) {
      return res.status(404).json({ message: "Land not found" });
    }

    // Update the isDeleted field to true
    land.isDeleted = true;
    await land.save();

    res.status(200).json({ message: "Land deleted successfully" });
  } catch (error) {
    console.error("Error deleting land", error);
    res.status(500).send("Error deleting land");
  }
};

