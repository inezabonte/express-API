const Joi = require("joi");

//adding a new article
const articleValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    coverImage: Joi.string().required(),
    content: Joi.string().required(),
  });

  return schema.validate(data);
};

//validating a message being sent
const messageValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    message: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports.articleValidation = articleValidation;
module.exports.messageValidation = messageValidation;
