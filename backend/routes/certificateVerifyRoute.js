const express = require("express");
const router = express.Router();
const { getCertificateBySerial } = require("../controllers/CertificateController.js");

router.get("/:serial", getCertificateBySerial);

module.exports = router;
