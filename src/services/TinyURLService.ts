import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import base62 from 'base62';
import TinyURLEntity from '../entities/TinyURLEntity';
import { getRepository } from 'typeorm';

const CHARSET =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
base62.setCharacterSet(CHARSET);
const TINY_URL_LENGTH = 8;

export const encode = async (req: Request, res: Response): Promise<void> => {
  const Repository = getRepository(TinyURLEntity);
  try {
    const record = await Repository.save({
      main_url: String(req.query.url),
      tiny_url: '',
      clicks: 0,
    });
    let tinyUrl = base62.encode(record.id);
    if (tinyUrl.length < TINY_URL_LENGTH)
      tinyUrl += randomString(TINY_URL_LENGTH - (tinyUrl.length + 1));

    const updatedRecord = await Repository.save({
      ...record,
      tiny_url: getUrl(tinyUrl, req),
    });

    res.status(HttpStatus.OK).json({ shortLink: updatedRecord.tiny_url });
  } catch (e: any) {
    console.log({ error: e });
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'error encoding url' });
  }
};

export const decode = async (req: Request, res: Response): Promise<void> => {
  const Repository = getRepository(TinyURLEntity);
  try {
    let tinyUrl: TinyURLEntity = await TinyURLEntity.findOne({
      tiny_url: getUrl(req.params.url, req),
    });
    tinyUrl = await Repository.save({ ...tinyUrl, clicks: tinyUrl.clicks + 1 });
    if (!tinyUrl.main_url)
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Record not found' });
    else res.status(HttpStatus.OK).json({ mainLink: tinyUrl.main_url });
  } catch (e: any) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'error decoding url' });
  }
};

export const statistics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tinyUrl: TinyURLEntity = await TinyURLEntity.findOne({
      tiny_url: getUrl(req.params.url, req),
    });
    if (!tinyUrl?.main_url)
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Record not found' });
    else res.status(HttpStatus.OK).json(tinyUrl);
  } catch (e: any) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'error decoding url' });
  }
};

export const visitUrl = async (req: Request, res: Response): Promise<any> => {
  const Repository = getRepository(TinyURLEntity);
  try {
    let tinyUrl: TinyURLEntity = await TinyURLEntity.findOne({
      tiny_url: getUrl(req.params.url, req),
    });
    tinyUrl = await Repository.save({ ...tinyUrl, clicks: tinyUrl.clicks + 1 });
    if (!tinyUrl.main_url)
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Record not found' });
    else res.redirect(tinyUrl.main_url);
  } catch (e: any) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'error decoding url', error: e.message });
  }
};

const randomString = (length: number): string => {
  let result = '';
  const charactersLength = CHARSET.length;
  for (let i = 0; i < length; i++) {
    result += CHARSET.charAt(Math.floor(Math.random() * charactersLength));
  }
  return '~' + result;
};

const getUrl = (url: string, req: Request): string => {
  return String(
    `${req.protocol}://${req.hostname}${
      process.env.NODE_ENV === 'development' ? ':' + process.env.PORT : ''
    }/${url}`
  );
};
