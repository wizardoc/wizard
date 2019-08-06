export const enum MIME {
  PNG = 'image/png',
  JPG = 'image/jpg',
  JPEG = 'image/jpeg',
}

export function isImage(MIMEType: string): boolean {
  return ([MIME.PNG, MIME.JPEG, MIME.JPEG] as string[]).includes(MIMEType);
}
