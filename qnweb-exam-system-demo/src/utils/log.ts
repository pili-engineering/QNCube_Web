export type LogLevel = 'disable' | 'warning' | 'debug' | 'log';

export class LogModel {
  public level: LogLevel;

  public preTitle = `${getLogTimeString()}`;

  public constructor(level: LogLevel) {
    this.level = level;
  }

  public setLevel(level: LogLevel): void {
    this.level = level;
  }

  public setPreTitle(preTitle: string): void {
    this.preTitle = `${getLogTimeString()} %c${preTitle}`;
  }

  public log(...args: unknown[]): void {
    if (this.level !== 'log') {
      return;
    }
    const style = 'color: #66ccff; font-weight: bold;';
    window.console.info(this.preTitle, style, ...args);
  }

  public debug(...args: unknown[]): void {
    if (this.level !== 'log' && this.level !== 'debug') {
      return;
    }
    const style = 'color: #A28148; font-weight: bold;';
    window.console.info(this.preTitle, style, ...args);
  }

  public warning(...args: unknown[]): void {
    if (this.level === 'disable') {
      return;
    }
    const style = 'color: #E44F44; font-weight: bold;';
    window.console.warn(this.preTitle, style, ...args);
  }
}

function getLogTimeString(): string {
  const date = new Date();
  function paddingStart(num: number): string {
    const str = num.toString();
    if (str.length < 2) {
      return `0${str}`;
    }

    return str;
  }
  const hours = paddingStart(date.getHours());
  const minutes = paddingStart(date.getMinutes());
  const secs = paddingStart(date.getSeconds());
  const msecs = date.getMilliseconds();

  return `[${hours}:${minutes}:${secs}.${msecs}]`;
}

export const log = new LogModel('log');
