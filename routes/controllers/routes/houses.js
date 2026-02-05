const express = require('express');
const router = express.Router();
const { getHouses, addHouse, getHouseById } = require('../controllers/houseController');
const { authMiddleware } = require('../middlewares/auth');

router.get('/', getHouses);
router.get('/:id', getHouseById);
router.post('/', authMiddleware, addHouse);

module.exports = router;
