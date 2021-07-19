import { Request } from 'express';
import base62 from 'base62';

const CHARSET =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
base62.setCharacterSet(CHARSET);

export const randomString = (length: number): string => {
  let result = '';
  const charactersLength = CHARSET.length;
  for (let i = 0; i < length; i++) {
    result += CHARSET.charAt(Math.floor(Math.random() * charactersLength));
  }
  return '~' + result;
};

export const getUrl = (url: string, req: Request): string => {
  return String(
    `${req.protocol}://${req.hostname}${
      process.env.NODE_ENV === 'development' ? ':' + process.env.PORT : ''
    }/${url}`
  );
};
