import { GOTO } from './goto';
import { LET } from './let';
import { WAIT } from './wait';
import { DO } from './do';
import { OD } from './od';
import { StrictMap } from '../../utils/structures.utils';
import { CommandType, ICommandRunnable } from '../../utils/type.utils';
import { IF } from './if';
import { ELIF } from './elif';
import { ELSE } from './else';
import { FI } from './fi';

export const COMMANDS: StrictMap<CommandType, ICommandRunnable<any, any>> = {
  do: DO,
  goto: GOTO,
  let: LET,
  od: OD,
  wait: WAIT,
  if: IF,
  elif: ELIF,
  else: ELSE,
  fi: FI,
};
