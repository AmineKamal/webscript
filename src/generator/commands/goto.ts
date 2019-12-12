import { Runner } from '../runner';
import { ICommandRunnable } from '../../utils/type.utils';

export interface IGotoCommand {
  url: string;
}

export const GOTO: ICommandRunnable<IGotoCommand, void> = async (runner: Runner, input: IGotoCommand) => {
  await runner.browser.goto(input.url);
};
