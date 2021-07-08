import findUp from "find-up";
import glob from "glob-promise";
import path from "path";
import { getCodeownerPatterns } from "./getCodeownerPatterns";

export async function checkCodeowners(targetGlob: string): Promise<void> {
  console.log(`Checking codeowner coverage for ${targetGlob}`);

  const githubFolder = await findUp(".github", { type: "directory" });

  if (!githubFolder) {
    throw new Error("Cannot locate .github folder");
  }

  const codeownerPath = path.join(githubFolder, "CODEOWNERS");

  const codeowners = await getCodeownerPatterns(codeownerPath);

  const found = await glob(targetGlob);

  const covered = await Promise.all(
    codeowners.map(async (pattern) => {
      return glob(pattern);
    })
  );

  const list = covered.reduce(
    (prev, curr) => [...prev, ...curr],
    [] as string[]
  );

  const missing = found.filter((item) => !list.includes(item));

  if (missing.length) {
    console.error(`Missing explicit codeowner for ${missing.length} items`);
    console.log(missing.join("\n"));
    process.exit(missing.length);
  }
}
