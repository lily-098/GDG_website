const express = require("express");
const router = express.Router();
const {createContact} = require("../controllers/CreateContact.js");
const { registerForEvent } = require("../controllers/RegisterEvent.js");
router.post("/contact", createContact);
router.post("/registerforevent", registerForEvent);
module.exports = router;