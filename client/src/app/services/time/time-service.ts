import {Injectable} from '@wizardoc/injector';

import {TimeUtil} from './time-utils';

/** int64 */
export type TimeUnit = number;

@Injectable()
export class Time {
  new(timeStamp: number): TimeUtil {
    return new TimeUtil(timeStamp);
  }

  /**
   * 书面多
   * @param duration 睡眠时间，单位是秒
   */
  sleep(duration?: number): Promise<void> {
    return new Promise(resolve =>
      setTimeout(resolve, (duration ?? 0) * Time.Second),
    );
  }

  static readonly Second: TimeUnit = 1000;
  static readonly MilliSecond: TimeUnit = 1;
  static readonly Minute: TimeUnit = 60 * Time.Second;
  static readonly Hour: TimeUnit = 60 * Time.Minute;
  static readonly Day: TimeUnit = 24 * Time.Hour;
}
