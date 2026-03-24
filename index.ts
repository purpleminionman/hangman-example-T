import { drawFrame } from "./src/draw-frame.ts";
import { getWord } from "./src/get-word.ts";
import { handleKey } from "./src/handle-key.ts";

const word = await getWord();
const letters = [...word];

const guesses = new Set<string>();
const incorrect = new Set<string>();

let stage = 0;

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on("data", (buffer) => {
  stage = handleKey(buffer, stage, word, letters, guesses, incorrect);
});

drawFrame(stage, word, letters, guesses, incorrect);
