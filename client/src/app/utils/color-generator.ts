export function colorGenerator(): string {
  const colors: string[] = [
    '#00b894',
    '#00cec9',
    '#0984e3',
    '#6c5ce7',
    '#fdcb6e',
    '#e17055',
    '#e84393',
    '#2d3436',
    '#636e72',
    '#ff7675',
  ];

  return colors[parseInt((Math.random() * colors.length).toString())];
}
