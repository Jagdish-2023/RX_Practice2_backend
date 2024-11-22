const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

const initializeDB = require("./db/db.connect");
const Movie = require("./model/movies.model");

initializeDB();

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/movies", async (req, res) => {
  const { title, director, genre } = req.body;
  try {
    const movie = new Movie({ title, director, genre });
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/movies/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  try {
    const deleteMovie = await Movie.findByIdAndDelete(movieId);
    if (!deleteMovie) {
      return res.status(404).json({ error: "Movie not found." });
    }
    res
      .status(200)
      .json({ message: "Movie deleted successfully.", movie: deleteMovie });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server has started running on PORT ", PORT);
});
