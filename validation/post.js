const Validator = require('validator');
const isEmpty = require('./is-empty');

const validatePostInput = (data) => {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  //data.comment.text = !isEmpty(data.comment.text) ? data.comment.text : '';

  if(!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 300 characters'
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text is required to post';
  }

  //if (Validator.isEmpty(data.comment.text)) {
  //  errors.comment.text = 'Text is required to comment';
  //}

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validatePostInput
