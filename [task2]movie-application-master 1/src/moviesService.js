// Import the axios library
const axios = require('axios');

const dbUrl = 'http://localhost:3000/movies';

const getMovies = async (done) => {
  // get all movies
  try {
    const res = await axios.get(`${dbUrl}`);
    return done(null, JSON.stringify(res.data));
  } catch (err) {
    return done('error 발생', null);
  }
};

const getMoviesById = async (movieId, done) => {
  // get movie by id
  try {
    const res = await axios.get(`${dbUrl}/${movieId}`);
    return done(null, JSON.stringify(res.data));
  } catch (err) {
    return done('not found', null);
  }
};

const saveMovie = async function (newMovie, done) {
  // save the details of a movie read from the request body
  try {
    const res = await axios.post(`${dbUrl}`, newMovie);
    return done(null, JSON.stringify(res.data));
  } catch (err) {
    return done('error 발생', null);
  }
};

const updateMovie = async function (movieId, updateData, done) {
  // update movie details of a specific movie
  try {
    const res = await axios.put(`${dbUrl}/${movieId}`, updateData);
    return done(null, JSON.stringify(res.data));
  } catch (err) {
    return done('not found', null);
  }
};

const deleteMovieById = async function (movieId, done) {
  // delete a specific movie
  try {
    const res = await axios.delete(`${dbUrl}/${movieId}`);
    return done(null, JSON.stringify(res.data));
  } catch (err) {
    return done('not found', null);
  }
};

module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById,
};
