import { Router } from "express";
import { TemperatureService } from "../service/TemperatureService";
import { TemperatureEndpoints } from "../endpoints/TemperatureEndpoints";
import { middleware } from "../middlewares/Middleware"
import dataAggregator from "../data/DataAggregator";

const router = Router();

const temperatureService = new TemperatureService(dataAggregator);
const temperatureEndpoints = new TemperatureEndpoints(temperatureService)

router.get("/:city", middleware.authenticate, temperatureEndpoints.getCityTemperature);
export default router;