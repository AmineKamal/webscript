import { Runner } from '../runner';
import { ICommandRunnable } from '../../shared/commands.interfaces';

export interface IDoCommand {
  n: number;
}

export const DO: ICommandRunnable<IDoCommand, void> = async (runner: Runner, input: IDoCommand) => {
  runner.loopManager.do(runner.i, input.n);
};
