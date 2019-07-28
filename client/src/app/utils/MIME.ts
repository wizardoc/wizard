export const enum MIME {
  PNG = 'image/png',
  JPEG = 'image/jpg',
}

export function isImage(MIMEType: string): boolean {
  return ([MIME.PNG, MIME.JPEG] as string[]).includes(MIMEType);
}
