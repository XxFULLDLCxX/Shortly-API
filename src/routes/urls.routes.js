import { Router } from "express";
import { deleteUrlById, getUrlById, redirectToOpenUrl } from "../controllers/urls.routes.js";

const urls_router = Router();
urls_router.get('/urls/:id', getUrlById)
urls_router.get('/urls/open/:shortUrl', redirectToOpenUrl)
urls_router.delete('/urls/:id', deleteUrlById)

export default urls_router;
