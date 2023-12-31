import Joi from "joi";

export const url_schema = Joi.object({
  url: Joi.string().uri({ scheme: ['http', 'https'] }).required()
});