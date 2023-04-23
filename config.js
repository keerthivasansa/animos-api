import { config } from "dotenv";

config();

const inputPath = process.env.ANIME_JSON_PATH;
const outputPath = process.env.OUTPUT_ASSETS_PATH;

console.log({ inputPath, outputPath });

if (!inputPath || !outputPath)
    throw new Error(".env does not have `ANIME_JSON_PATH` or `OUTPUT_ASSETS_PATH`")

export { inputPath, outputPath };