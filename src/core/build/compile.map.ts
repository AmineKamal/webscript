import { StrictMap } from '../../shared/general.interfaces';
import { CommandType } from '../../shared/commands.interfaces';

export type ICommandKeys = string[];

export const MAP: StrictMap<CommandType, ICommandKeys> = {
  do: ['n'],
  goto: ['url'],
  let: ['variable', 'value'],
  od: [],
  wait: ['time'],
};
