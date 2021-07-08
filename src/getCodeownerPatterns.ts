import fs from "fs/promises";
import path from "path";

async function readCodeowners(filepath: string) {
  try {
    const contents = await fs.readFile(filepath, "utf8");
    return contents;
  } catch (err) {
    console.error(
      "Unable to read CODEOWNERS file. Are you in the root directory of the repo?"
    );

    process.exit(1);
  }
}

export async function getCodeownerPatterns(): Promise<string[]> {
  const codeownersPath = path.resolve(process.cwd(), ".github/CODEOWNERS");

  const contents = await readCodeowners(codeownersPath);

  return contents
    .split("\n")
    .filter((l) => !l.startsWith("#") && l.trim())
    .map((l) => {
      const [pattern] = l.split(/\s+/);
      return pattern;
    })
    .filter((pattern): pattern is string => Boolean(pattern))
    .filter((pattern) => pattern !== "*") // remove the global owner;
    .map((pattern) =>
      pattern.replace(/^\//, "./").replace(/^[^.]/, "./").replace(/\/$/, "")
    );
}
