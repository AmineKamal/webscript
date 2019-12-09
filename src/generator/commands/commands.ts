import { StrictMap } from '../../shared/general.interfaces';
import { ICommandRunnable, CommandType } from '../../shared/commands.interfaces';
import { GOTO } from './goto';
import { LET } from './let';
import { WAIT } from './wait';
import { DO } from './do';
import { OD } from './od';

export const COMMANDS: StrictMap<CommandType, ICommandRunnable<any, any>> = {
  do: DO,
  goto: GOTO,
  let: LET,
  od: OD,
  wait: WAIT,
};
