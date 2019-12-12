import { Runner } from '../runner';
import { ICommandRunnable } from '../../utils/type.utils';

export interface IDoCommand {
  n: number;
}

export const DO: ICommandRunnable<IDoCommand, void> = async (runner: Runner, input: IDoCommand) => {
  runner.loopManager.do(runner.i, input.n);
};
