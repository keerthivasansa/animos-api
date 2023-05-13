import express from "express";
import { readFile } from "fs/promises"
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
import { outputPath } from "./config.js";
import { join } from "path";
import axios from "axios";
import { convertStore } from "./convert.js";

const app = express();

const serverUpdate = new Date().toString();
const JSON_PATH = join(outputPath, "converted.json");
const res = existsSync(JSON_PATH);

let store = {};

if (!res) {
    console.log("Missing JSON file, downloading. . .");
    if (!existsSync("assets"))
        mkdirSync("assets");

    axios.get("https://raw.githubusercontent.com/Fribb/anime-lists/master/anime-list-full.json").then(resp => {
        const data = resp.data;
        store = convertStore(data);
        writeFileSync(JSON_PATH, JSON.stringify(store));
    })
} else {
    store = JSON.parse(readFileSync(JSON_PATH, "utf-8"))
}


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