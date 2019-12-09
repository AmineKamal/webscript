import { Runner } from '../runner';
import { ICommandRunnable } from '../../shared/commands.interfaces';

export interface IGotoCommand {
  url: string;
}

export const GOTO: ICommandRunnable<IGotoCommand, void> = async (runner: Runner, input: IGotoCommand) => {
  await runner.browser.goto(input.url);
};
