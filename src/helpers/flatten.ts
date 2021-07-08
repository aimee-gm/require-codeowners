export function flatten<T>(ary: T[][]): T[] {
  return ary.reduce((prev, curr) => [...prev, ...curr], [] as T[]);
}
