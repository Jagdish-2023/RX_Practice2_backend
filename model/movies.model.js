const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  genre: { type: String, required: true },
});

const Movie = mongoose.model("Movies", movieSchema);

module.exports = Movie;
