import Moment from 'moment';

export class TimeUtil {
  private _timeStamp: number;

  constructor(timeStamp: number) {
    this._timeStamp = timeStamp;
  }

  delay(): void {}

  get timeStamp(): number {
    return this._timeStamp;
  }

  get date(): Date {
    return new Date(this._timeStamp);
  }

  format(formatString?: string): string {
    return Moment(this._timeStamp).format(formatString);
  }
}
