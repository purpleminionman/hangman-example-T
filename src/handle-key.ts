import chalk from "chalk";
import { drawFrame } from "./draw-frame";

export function handleKey(
  buffer: Buffer,
  stage: number,
  word: string,
  letters: Array<string>,
  guesses: Set<string>,
  incorrect: Set<string>,
): number {
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

      drawFrame(stage, word, letters, guesses, incorrect);
    }
  }

  return stage;
}
