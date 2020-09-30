import Joi from "joi";

export default function (req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    discussion: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
