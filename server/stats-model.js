const mongoose = require("mongoose");

const StatSchema = new mongoose.Schema({
  guestTokensCreated: {type: Number, required: true, default: 0}
});

module.exports = mongoose.model("stats", StatSchema);