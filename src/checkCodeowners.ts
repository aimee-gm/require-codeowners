import { getCodeownerPatterns } from "./getCodeownerPatterns";
import { flatten } from "./helpers/flatten";
import { globPromise } from "./helpers/glob";

export async function checkCodeowners(targetGlob: string): Promise<void> {
  console.log(`Checking codeowner coverage for ${targetGlob}`);

  // get a list of all codeowner glob patterns
  const codeowners = await getCodeownerPatterns();

  // find all directories and files that match the input glob pattern
  const found = await globPromise(targetGlob);

  // find all directories or files that are codeownered
  const covered = await Promise.all(
    codeowners.map(async (pattern) => globPromise(pattern))
  );

  const list = flatten(covered);

  // filter the list that matches the input pattern to ignore codeownered items
  const missing = found.filter((item) => !list.includes(item));

  // output the result
  if (missing.length) {
    console.error(`Missing explicit codeowner for ${missing.length} items`);
    console.log(missing.join("\n"));
    process.exit(missing.length);
  }
}
