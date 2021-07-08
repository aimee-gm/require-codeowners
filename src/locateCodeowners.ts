import findUp from "find-up";
import path from "path";

export async function locateCodeowners(): Promise<string> {
  const githubFolder = await findUp(".github", { type: "directory" });

  if (!githubFolder) {
    throw new Error("Cannot locate .github folder");
  }

  return path.join(githubFolder, "CODEOWNERS");
}
