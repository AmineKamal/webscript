import { Runner } from '../runner';
import { ICommandRunnable } from '../../utils/type.utils';

export interface IWaitCommand {
  time: number;
}

export const WAIT: ICommandRunnable<IWaitCommand, void> = async (runner: Runner, input: IWaitCommand) => {
  await runner.browser.wait(input.time);
};
