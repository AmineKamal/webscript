import { Stack } from '../../shared/classes/stack';
import { ICommand } from '../../shared/commands.interfaces';

type LoopStart = 'do';
type LoopEnd = 'od';

const LOOPS_START: LoopStart[] = ['do'];
const LOOPS_END: LoopEnd[] = ['od'];

export class LoopValidator {
  private loops: Stack<LoopStart> = new Stack<LoopStart>();

  public validate(command: ICommand) {
    if (isLoopStart(command.type)) this.loops.push(command.type);
    if (isLoopEnd(command.type)) return this._validate(command.type);

    return true;
  }

  private _validate(end: LoopEnd) {
    switch (end) {
      case 'od':
        return this.loops.pop() === 'do';

      default:
        return false;
    }
  }
}

const isLoopStart = (l => LOOPS_START.includes(l as LoopStart)) as (l: string) => l is LoopStart;
const isLoopEnd = (l => LOOPS_END.includes(l as LoopEnd)) as (l: string) => l is LoopEnd;
