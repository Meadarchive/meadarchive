import express from "express";
import bodyParser from "body-parser";
import cors from "cors"

import { config } from "./config";
import { healthStatus } from "./handlers";

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())


app.get("/health" , healthStatus);


app.listen(config.port, () => console.log(`Listening on port ${config.port}`));