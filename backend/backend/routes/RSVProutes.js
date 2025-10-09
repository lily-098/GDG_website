const express = require("express");
const router = express.Router();
const {rsvpUser}=require("../controllers/rsvpcontroller.js");
router.post("/user", rsvpUser);
module.exports = router;