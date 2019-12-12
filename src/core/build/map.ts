import { StrictMap } from '../../utils/structures.utils';
import { CommandType } from '../../utils/type.utils';

export type ICommandKeys = string[];

export const MAP: StrictMap<CommandType, ICommandKeys> = {
  do: ['n'],
  goto: ['url'],
  let: ['variable', 'value'],
  od: [],
  wait: ['time'],
  if: ['ex'],
  elif: ['ex'],
  else: [],
  fi: [],
};
