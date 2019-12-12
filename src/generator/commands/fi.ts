import { Runner } from '../runner';
import { ICommandRunnable } from '../../utils/type.utils';

export const FI: ICommandRunnable<{}, void> = async (runner: Runner) => {
  runner.skip = runner.conditionManager.fi();
};
