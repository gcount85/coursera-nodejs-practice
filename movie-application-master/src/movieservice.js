//import axios module
const axios = require('axios');

//After starting the JSOn server check the port on which is running accordingly change
//the port in url given below

//This method will get all movies from json server
const getMovies = async (done) => {
  // This url can be used - axios.get("http://localhost:3000/movies")
  try {
    const res = await axios.get('http://localhost:3000/movies');
    return done(undefined, res.data);
  } catch (err) {
    return done('err while fetching all movies', err);
  }
};

//This method will get specific movie id from json server
const getMovieById = async (movieId, done) => {
  // This url can be used- axios.get(`http://localhost:3000/movies/${movieId}`)
  try {
    const res = await axios.get(`http://localhost:3000/movies/${movieId}`);
    return done(undefined, res.data);
  } catch (err) {
    return done('err while fetching a movie', err);
  }
};
//This method will save Movie details in Json server
const saveMovieDetails = (movieDetails, done) => {
  //This url can be used  -  axios.post(`http://localhost:3000/movies`, movieDetails)
};

//This method will update MovieDetails in Json Server
const updateMovieDetails = (movieId, movieDetails, done) => {
  //This url can be used - axios.patch(`http://localhost:3000/movies/${movieId}`, movieDetails)
};

//This method will delete specific movie from Json Server
const deleteMovieById = (movieId, done) => {
  //This url can be used -  axios.delete(`http://localhost:3000/movies/${movieId}`)
};

module.exports = {
  getMovies,
  getMovieById,
  saveMovieDetails,
  deleteMovieById,
  updateMovieDetails,
};
