import express, { Application } from 'express';
import cors from "cors";
import { StartWebSocketClient } from "./webSocketClient/WebSocketClient"
import TemperatureRoutes from "./routes/TemperatureRoutes"

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.json())
app.use("/temperature", TemperatureRoutes)

app.listen(PORT, () => {
    console.log('Server listening on Port - ', PORT)
    StartWebSocketClient();
})