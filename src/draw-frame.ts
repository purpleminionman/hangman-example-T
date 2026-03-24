import chalk from "chalk";
import { stages } from "./stages";

export function drawFrame(
  stage: number,
  word: string,
  letters: Array<string>,
  guesses: Set<string>,
  incorrect: Set<string>,
): void {
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
