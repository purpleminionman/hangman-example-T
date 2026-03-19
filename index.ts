import { stages } from "./stages.ts";

import chalk from "chalk";

const file = Bun.file("words.txt");
const text = await file.text();

const words = text
  .split(",")
  .map((w) => w.trim())
  .filter(Boolean);

const word = words[Math.floor(Math.random() * words.length)];
const letters = [...word];

const guesses = new Set<string>();
const incorrect = new Set<string>();

let stage = 0;

function drawFrame() {
  console.clear();
  console.log(stages[stage]);

  const display = letters.map((l) => (guesses.has(l) ? l : "_")).join(" ");

  console.log(chalk.blue(`Guess: ${display}`));
  console.log(chalk.yellow(`Incorrect: ${[...incorrect].sort().join(" ")}`));

  if (stage === stages.length - 1) {
    console.log(chalk.red(`You lose! The word was: ${word}`));
    process.exit(0);
  } else if (letters.every((l) => guesses.has(l))) {
    console.log(chalk.green("You win!"));
    process.exit(0);
  }
}

function handleKey(buffer: Buffer) {
  const ch = buffer.toString().toUpperCase();

  // C-c
  if (buffer[0] === 3) {
    console.clear();
    console.log(chalk.red("Game exit"));
    process.exit(0);
  }

  if (/^[A-Z]$/.test(ch)) {
    if (!guesses.has(ch) && !incorrect.has(ch)) {
      if (letters.includes(ch)) {
        guesses.add(ch);
      } else {
        incorrect.add(ch);
        stage++;
      }

      drawFrame();
    }
  }
}

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on("data", handleKey);

drawFrame();
