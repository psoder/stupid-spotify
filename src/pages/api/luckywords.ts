import fs from "fs/promises";
import { getrandominteger } from "@/util";

export default async function handler(req, res) {
    let wordlist: string[] = [];
    try {
        const wordstring = await fs.readFile(`${process.cwd()}/docs/words`, "utf8");
        wordlist = wordstring.split("\n");
    } catch (e) {
        console.error(e);
    }
    const index = getrandominteger(0, wordlist.length);
    res.status(200).json({ word: wordlist[index] });
}
