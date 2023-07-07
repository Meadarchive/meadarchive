import express from "express";
import bodyParser from "body-parser";
import cors from "cors"

import { config } from "./config";
import { healthStatus,  createRecipe } from "./handlers";
import { authMiddleware } from "./lib/authMiddleware"
import { restrictAccessMiddleware } from "./lib/restrictAccessMiddleware"

let app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(authMiddleware)


app.get("/health" , healthStatus);
app.post("/recipe/create", restrictAccessMiddleware, createRecipe)


app.listen(config.port, () => console.log(`Listening on port ${config.port}`));