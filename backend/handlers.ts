import express from "express";

export async function healthStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    try{

        res.send({ status: "OK" });

    } catch (err) {
        res.status(500).send({ "error": "Internal server error" });
    }
}