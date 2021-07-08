import fs from "fs/promises";
import { locateCodeowners } from "./locateCodeowners";

export async function getCodeownerPatterns(): Promise<string[]> {
  const codeownersPath = await locateCodeowners();
  const contents = await fs.readFile(codeownersPath, "utf8");

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
