import { Runner } from '../generator/runner';

export interface ICommand {
  type: CommandType;
  args: any[];
}

export interface IRunCommand {
  type: CommandType;
  input: any;
}

export type ICommandRunnable<I, O> = (runner: Runner, args: I) => Promise<O>;

export type CommandType = 'goto' | 'let' | 'wait' | 'do' | 'od';
export const COMMAND_TYPES: CommandType[] = ['goto', 'let', 'wait', 'do', 'od'];
