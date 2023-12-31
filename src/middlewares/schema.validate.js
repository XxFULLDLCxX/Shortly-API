export const validateSchema = (schema) => {
  return (req, res, next) => {
    try {
      const validation = schema.validate(req.body, { abortEarly: false });
      if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
      }
      res.locals = { ...res.locals, ...validation.value };
    } catch (err) { return res.status(500).send(err.message); }
    next();
  };
};