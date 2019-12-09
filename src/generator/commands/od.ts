import { Runner } from '../runner';
import { ICommandRunnable } from '../../shared/commands.interfaces';

export const OD: ICommandRunnable<{}, void> = async (runner: Runner) => {
  runner.i = runner.loopManager.od(runner.i);
};
