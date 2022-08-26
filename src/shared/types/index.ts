export type Element = {
  className?: string;
};

export type ScenarioStateType = 'clean' | 'warning' | 'error' | 'excluded';

export type ScraperType = 'auth' | 'transaction' | 'customer' | 'account';

export enum ScraperState {
  Running = 'Running',
  Pause = 'Pause',
  Stopped = 'Stopped',
  Error = 'Error',
}

export type ScraperLog = {
  prefix?: 'INFO' | 'WARN' | 'ERROR';
  message: string;
};

export type BoardType = {
  name: string;
};
