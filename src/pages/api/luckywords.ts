import fs from "fs/promises";
import { getRandomInteger } from "@/util";

export default async function handler(req, res) {
    let wordlist: string[] = [];
    try {
        const wordstring = await fs.readFile(`${process.cwd()}/docs/words`, "utf8");
        wordlist = wordstring.split("\n");
    } catch (e) {
        console.error(e);
    }
    const index = getRandomInteger(0, wordlist.length);
    res.status(200).json({ word: wordlist[index] });
}