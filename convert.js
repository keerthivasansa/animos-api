import { readFileSync, writeFileSync } from "fs";
import { inputPath, outputPath } from "./config.js";
import { join } from "path";


const ogStore = JSON.parse(readFileSync(inputPath, "utf-8"));

const newStore = {};

for (let i = 0; i < ogStore.length; i++) {
    const row = ogStore[i];
    if (!row.kitsu_id && !row.livechart_id)
        continue;
    newStore[row.mal_id] = {
        livechart_id: row.livechart_id,
        kitsu_id: row.kitsu_id
    }
}

writeFileSync(join(outputPath, "converted.json"), JSON.stringify(newStore))
writeFileSync(join(outputPath, "timestamp.txt"), `Last updated on ${new Date().toString()}`)
