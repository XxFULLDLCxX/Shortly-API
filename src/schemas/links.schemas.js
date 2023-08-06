import Joi from "joi";

export const url_schema = Joi.object({
  url: Joi.string().pattern(/^https:\/\//).required()
});