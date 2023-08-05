import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/schema.validate.js";
import { signin_schema, signup_schema } from "../schemas/auth.schemas.js";

const auth_router = Router();
auth_router.post("/signup", validateSchema(signup_schema), signup);
auth_router.post("/signin", validateSchema(signin_schema), signin);
export default auth_router;
