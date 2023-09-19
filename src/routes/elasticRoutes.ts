import express, { Router } from "express";
import elasticController from "../controllers/elasticController";
const router: Router = express.Router();
// Forward Elasticsearch queries
router.post("/search", elasticController.elasticSearch);
// Forward Elasticsearch queries
router.post("/mapping", elasticController.elasticMapping);
router.get("/check", elasticController.healthcheck);
export default router;
