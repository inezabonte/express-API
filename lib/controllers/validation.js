import Joi from "joi";

//adding a new article
export const articleValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    coverImage: Joi.string().required(),
    content: Joi.string().required(),
  });

  return schema.validate(data);
};

//validate a user login
export const userValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

//validate user comment
export const commentValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    discussion: Joi.string().required(),
  });

  return schema.validate(data);
};
