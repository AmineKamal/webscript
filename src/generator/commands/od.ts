import { Runner } from '../runner';
import { ICommandRunnable } from '../../utils/type.utils';

export const OD: ICommandRunnable<{}, void> = async (runner: Runner) => {
  runner.i = runner.loopManager.od(runner.i);
};
