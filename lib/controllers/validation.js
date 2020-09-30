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
