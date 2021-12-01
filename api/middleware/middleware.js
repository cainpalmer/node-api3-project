
// Middleware Variables
const User = require('../users/users-model');
const Post = require('../posts/posts-model');

// Middlewares
function logger(req, res, next) {
  console.log(req.method, req.url, Date.now())
  next()
}

function validateUserId(req, res, next) {
  const {id} = req.params;
  User.getById(id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({message: 'user not found'});
    }
  })
  .catch(err => {
    res.status(404).json('error retrieving from database');
  });
}

function validateUser(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({message: 'missing required name field'});
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body.text) {
    res.status(400).json({message: 'missing required text field'});
  } else {
    next();
  }
}

// Exports
module.exports = {logger, validateUserId, validateUser, validatePost};
