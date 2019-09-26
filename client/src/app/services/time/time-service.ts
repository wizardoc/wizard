import {Injectable} from 'react-ts-di';

import {TimeUtil} from './time-utils';

/** int64 */
export type TimeUnit = number;

@Injectable()
export class Time {
  new(timeStamp: number): TimeUtil {
    return new TimeUtil(timeStamp);
  }

  static readonly Second: TimeUnit = 1000;
  static readonly MilliSecond: TimeUnit = 1;
  static readonly Minute: TimeUnit = 60 * Time.Second;
  static readonly Hour: TimeUnit = 60 * Time.Minute;
  static readonly Day: TimeUnit = 24 * Time.Hour;
}
