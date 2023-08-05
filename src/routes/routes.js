import { Router } from "express";
import auth_router from "./auth.routes.js";
import page_router from "./pages.routes.js";
import urls_router from "./urls.routes.js";

const router = Router();

router.use(auth_router);
router.use(page_router);
router.use(urls_router);

export default router;