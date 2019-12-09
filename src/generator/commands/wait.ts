import { Runner } from '../runner';
import { ICommandRunnable } from '../../shared/commands.interfaces';

export interface IWaitCommand {
  time: number;
}

export const WAIT: ICommandRunnable<IWaitCommand, void> = async (runner: Runner, input: IWaitCommand) => {
  await runner.browser.wait(input.time);
};
