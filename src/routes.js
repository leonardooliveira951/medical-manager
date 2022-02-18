const express = require("express");
const router = express.Router();
// const DB = require("./characters");

router.get('/', (req, res) => {
    res.status(200).json("Ola");
});

module.exports = router;