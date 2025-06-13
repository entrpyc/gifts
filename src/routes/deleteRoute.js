const express = require('express');

const { deleteController } = require('../controllers/deleteController');

const router = express.Router();

router.post('/', deleteController);

module.exports = router;