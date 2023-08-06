import { Router } from "express";
import { getRanking, getUser } from "../controllers/pages.controller.js";
import { validateAuth } from "../middlewares/auth.validate.js";

const page_router = Router();

page_router.get("/ranking", getRanking);
page_router.get("/users/me", validateAuth, getUser);

export default page_router;