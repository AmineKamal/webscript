import { Runner } from '../runner';
import { ICommandRunnable } from '../../utils/type.utils';
import { BooleanExpressionSolver } from '../../utils/expressions.utils';

export interface IElifCommand {
  ex: string;
}

export const ELIF: ICommandRunnable<IElifCommand, void> = async (runner: Runner, input: IElifCommand) => {
  runner.skip = runner.conditionManager.elif(input.ex, runner.variables);
};
