import fs from "fs";

function getMaxWordLength() {
    const words = fs
        .readFileSync("../data/words_alpha.txt", "utf-8")
        .split("\n");
    let maxWordLength = 0;
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > maxWordLength) {
            maxWordLength = words[i].length;
        }
    }
    console.log(maxWordLength);
    return maxWordLength;
}

getMaxWordLength();
