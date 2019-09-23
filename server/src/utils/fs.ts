import * as FS from 'fs';
import {promisify} from 'util';

export const readFile = promisify(FS.readFile);

export async function readFileByStream(path: string): Promise<string> {
  const readStream = FS.createReadStream(path);

  return new Promise((resolve, reject) => {
    const result: string[] = [];

    readStream.on('data', chunk => result.push(chunk));
    readStream.on('error', err => reject(err));
    readStream.on('end', () => resolve(result.join('')));
  });
}
