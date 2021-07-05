const express = require('express');
const router = express.Router();
const htmlcontroller = require("../controller/htmlcontroller")
const apicontroller = require("../controller/apicontroller")

router.route('/').get(htmlcontroller.index)
router.route('/search').get(apicontroller.search)

module.exports = router;
