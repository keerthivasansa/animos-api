import express from "express";
import { readFile } from "fs/promises"
import { readFileSync } from "fs";
import { outputPath } from "./config.js";
import { join } from "path";

const app = express();

const serverUpdate = new Date().toString();

const store = JSON.parse(readFileSync(join(outputPath, "converted.json"), "utf-8"))

app.get("/mappings/:malId", (req, res) => {
    const { malId } = req.params;
    const id = Number(malId);
    if (Number.isNaN(id))
        return res.send("Not a valid param");
    const row = store[id];
    res.json(row || {});
})

app.get("/status", async (req, res) => {
    try {
        const fileUpdate = await readFile(join(outputPath, "timestamp.txt"), "utf-8");
        res.send({ fileUpdate, serverUpdate })
    } catch {
        res.send("Failed to read timestamp, have you run `convert.js`");
    }
})

app.listen(5000, () => console.log("Express Server started at http://localhost:5000"))