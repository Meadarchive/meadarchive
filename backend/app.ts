import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import { config } from "./config"
import { healthStatus,  createRecipe, getRecipe, deleteRecipe, createBatch, createBatchUpdate, getBatch, deleteBatch, deleteBatchUpdate, getBatchUpdate, whoami, genURLQRCode, getBatchGravity} from "./handlers"
import { authMiddleware } from "./lib/authMiddleware"
import { restrictAccessMiddleware } from "./lib/restrictAccessMiddleware"

let app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(authMiddleware)


app.get("/health" , healthStatus)
app.get("/whoami", whoami)
app.get("/recipe",  getRecipe)
app.get("/batch",  getBatch)
app.get("/batch/update",  getBatchUpdate)
app.get("/get-qr",  genURLQRCode)
app.get("/batch/get-gravity", getBatchGravity)


app.post("/recipe/create", restrictAccessMiddleware, createRecipe)
app.post("/recipe/delete", restrictAccessMiddleware, deleteRecipe)

app.post("/batch/create", restrictAccessMiddleware, createBatch)
app.post("/batch/delete", restrictAccessMiddleware, deleteBatch)
app.post("/batch/update/create", restrictAccessMiddleware, createBatchUpdate)
app.post("/batch/update/delete", restrictAccessMiddleware, deleteBatchUpdate)



app.listen(config.port, () => console.log(`Listening on port ${config.port}`))