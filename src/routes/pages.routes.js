import { Router } from "express";
import { getRaking, getUser } from "../controllers/pages.controller.js";

const page_router = Router();

page_router.get("/ranking", getRaking);
page_router.get("/users/me", getUser);

export default page_router;