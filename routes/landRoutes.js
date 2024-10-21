const express = require('express');
const router = express.Router();
const landController = require('../controllers/landController');
const upload = require('../middleware/uploadMiddleware');

router.get('/', landController.getLands);
router.post('/', upload.single('image'), landController.createLand);

module.exports = router;
