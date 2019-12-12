import { Runner } from '../runner';
import { ICommandRunnable } from '../../utils/type.utils';

export interface ILetCommand {
  variable: string;
  value: any;
}

export const LET: ICommandRunnable<ILetCommand, void> = async (runner: Runner, input: ILetCommand) => {
  runner.variables[input.variable] = input.value;
};
