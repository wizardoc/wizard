export function objectShallowDiff(origin: any, target: any): boolean {
  return Object.keys(origin).reduce(
    (pre, key) => pre && target[key] === origin[key],
    true,
  );
}
