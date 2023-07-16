import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import { config } from "./config"
import { healthStatus,  createRecipe, getRecipe, deleteRecipe, createBatch } from "./handlers"
import { authMiddleware } from "./lib/authMiddleware"
import { restrictAccessMiddleware } from "./lib/restrictAccessMiddleware"

let app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(authMiddleware)


app.get("/health" , healthStatus)
app.get("/recipe",  getRecipe)

app.post("/recipe/create", restrictAccessMiddleware, createRecipe)
app.post("/recipe/delete", restrictAccessMiddleware, deleteRecipe)

app.post("/bath/create", restrictAccessMiddleware, createBatch)

app.listen(config.port, () => console.log(`Listening on port ${config.port}`))