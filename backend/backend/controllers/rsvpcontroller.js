const RSVP= require("../models/RSVP");
const rsvpUser = async (req, res) => {
  try {

    const { name, email, branch, domain,message } = req.body;

    // Check if RSVP already exists
    const rsvpexists = await RSVP.findOne({ email });
    if (rsvpexists) {
      return res.status(400).json({ message: "RSVP already exists" });
    }
    const rsvp = await RSVP.create({
      name,
      email,
      branch,
      domain,
      message
    });

    if (rsvp) {
      res.status(201).json({
        _id: rsvp._id,
        name: rsvp.name,
        email: rsvp.email,
        branch: rsvp.branch,
        domain: rsvp.domain,
        message: rsvp.message
      });
    } else {
      res.status(400).json({ message: "Invalid RSVP data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
module.exports = { rsvpUser };