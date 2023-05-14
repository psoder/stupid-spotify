//import fs from "fs/promises";
//import { getRandomInteger } from "@/util";

/*   using local word API
export default async function handler(req, res) {
    res.status(200).json({ word: await getRandomWord() });
}

export async function getRandomWord(): Promise<string> {
    let wordlist: string[] = [];
    try {
        const wordstring = await fs.readFile(`${process.cwd()}/docs/words`, "utf8");
        wordlist = wordstring.split("\n");
    } catch (e) {
        console.error(e);
    }
    const index = getRandomInteger(0, wordlist.length);

    return wordlist[index];
}
*/

// Using Internet API
export async function getRandomWord(): Promise<string> {
    try {
        const response = await fetch("https://random-word-api.herokuapp.com/word");
        const [word] = await response.json();
        //console.log("aaa");
        console.log(word);
        return word;
    } catch (e) {
        console.error(e);
        return "";
    }
}
