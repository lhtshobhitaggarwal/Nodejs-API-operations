const express = require('express');
const router = express.Router();
const controller = require('../controllers/dataController');

//  Single route for all 5 methods
router.route('/api/data').all(controller);

module.exports = router;
