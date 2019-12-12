import { Runner } from '../runner';
import { ICommandRunnable } from '../../utils/type.utils';
import { BooleanExpressionSolver } from '../../utils/expressions.utils';

export interface IIfCommand {
  ex: string;
}

export const IF: ICommandRunnable<IIfCommand, void> = async (runner: Runner, input: IIfCommand) => {
  runner.skip = runner.conditionManager.if(input.ex, runner.variables);
};
