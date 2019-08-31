import {Injectable} from 'react-ts-di';

/** int64 */
export type TimeUnit = number;

@Injectable()
export class Time {
  private _timeStamp: number;

  constructor(timeStamp: number) {
    this._timeStamp = timeStamp;
  }

  delay(): void {}

  get timeStamp(): number {
    return this._timeStamp;
  }

  static readonly Second: TimeUnit = 1000;
  static readonly MilliSecond: TimeUnit = 1;
  static readonly Minute: TimeUnit = 60 * Time.Second;
  static readonly Hour: TimeUnit = 60 * Time.Minute;
  static readonly Day: TimeUnit = 24 * Time.Hour;
}
