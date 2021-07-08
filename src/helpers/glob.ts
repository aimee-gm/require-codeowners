import glob from "glob";

export function globPromise(pattern: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(pattern, (err: Error | null, matches: string[]) =>
      err ? reject(err) : resolve(matches)
    );
  });
}
