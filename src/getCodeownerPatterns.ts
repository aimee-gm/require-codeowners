import fs from "fs/promises";

export async function getCodeownerPatterns(path: string): Promise<string[]> {
  const contents = await fs.readFile(path, "utf8");

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
