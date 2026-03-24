import path from "node:path";

export async function getWord(): Promise<string> {
  const file = Bun.file(path.join(process.cwd(), "static", "words.txt"));
  const text = await file.text();

  const words = text
    .split(",")
    .map((w) => w.trim())
    .filter(Boolean);

  const word = words[Math.floor(Math.random() * words.length)];

  return word;
}
