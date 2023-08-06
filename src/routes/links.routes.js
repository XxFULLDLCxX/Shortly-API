import { Router } from "express";
import { deleteLink, postShortUrl, getLinkById, redirectToOpenUrl } from "../controllers/links.controller.js";
import { validateAuth } from "../middlewares/auth.validate.js";
import { validateSchema } from "../middlewares/schema.validate.js";
import { url_schema } from "../schemas/links.schemas.js";

const urls_router = Router();
urls_router.get('/urls/:id', getLinkById);
urls_router.get('/urls/open/:shortUrl', redirectToOpenUrl);
urls_router.post('/urls/shorten', validateAuth, validateSchema(url_schema), postShortUrl);
urls_router.delete('/urls/:id', validateAuth, deleteLink);

export default urls_router;
