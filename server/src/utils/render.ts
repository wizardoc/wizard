export function renderEngine(
  target: string,
  variableName: string,
  replace: string,
): string {
  const regex = new RegExp(`{{\\s*?${variableName}\\s*?}}`);

  return target.replace(regex, replace);
}
