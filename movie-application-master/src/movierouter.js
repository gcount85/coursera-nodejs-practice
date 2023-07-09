//import all the modules required
const express = require('express');
const router = express.Router();
const movieController = require('./moviecontroller');

// movieId를 int로 변환하는 미들웨어
const intMovieId = (req, res, next) => {
  console.log(req.params);
  if (req.params.movieId) {
    req.params.movieId = parseInt(req.params.movieId);
  }
  next();
};

/**
 * API to get the details of all movies
 * EFFECTIVE URL: GET /api/v1/movies
 */
router.get('/', (req, res) => {
  try {
    //calling controller method and passing the parameters
    //return the response as per error or result coming from controller
    movieController.getMovies((err, results) => {
      if (err) {
        return res.status(400).send('error while fetching all movies');
      }

      return res.status(200).send({ STATUS: 'OK', data: results });
    });
  } catch (err) {
    return res.status(400).send('error while fetching all movies');
  }
});

/**
 * API to get the details of specific movie
 * EFFECTIVE URL: GET /api/v1/movie/:movieId
 */
//
router.get('/:movieId', intMovieId, (req, res) => {
  try {
    //retreive moviedId from req.params
    const { movieId } = req.params;
    //calling controller method and passing the parameters
    //return the response as per error or result coming from controller
    movieController.getMovieById(movieId, (err, results) => {
      if (err) {
        return res.status(400).send('error while fetching a movie');
      }
      return res.status(200).send({ STATUS: 'OK', data: results });
    });
  } catch (err) {
    return res.status(400).send('error while fetching a movie');
  }
});

/**
 * API to save new movie
 * EFFECTIVE URL: POST /api/v1/movies
 */
router.post('/', (req, res) => {
  try {
    //retreive movieDetails from req.body
    const movieDetails = req.body;
    //calling controller method and passing the parameters
    //return the response as per error or result coming from controller
    movieController.saveMovieDetails(movieDetails, (err, results) => {
      if (err) {
        return res.status(400).send('error while fetching a movie');
      }
      return res.status(201).send({ STATUS: 'OK', data: results });
    });
  } catch (err) {
    return res.status(400).send('error while saving a movie');
  }
});

/**
 * API to edit movie detail
 * EFFECTIVE URL: PATCH /api/v1/movies/:movieId
 */
router.patch('/:movieId', intMovieId, (req, res) => {
  try {
    //retreive moviedId from req.params

    //retreive movieDetails from req.body
    const movieDetails = {};
    //calling controller method and passing the parameters
    //return the response as per error or result coming from controller
    movieController.updateMovieDetails(
      movieId,
      movieDetails,
      (err, results) => {}
    );
  } catch (err) {}
});

/**
 * API to delete movie
 * EFFECTIVE URL: DELETE /api/v1/movies/:movieId
 */
router.delete('/:movieId', intMovieId, (req, res) => {
  try {
    //retreive moviedId from req.params

    //calling controller method and passing the parameters
    //return the response as per error or result coming from controller
    movieController.deleteMovieById(movieId, (err, results) => {});
  } catch (err) {}
});

module.exports = router;
