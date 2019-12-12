import { StrictMap } from '../../utils/structures.utils';
import { CommandType, ICommandValidator } from '../../utils/type.utils';

export const VALIDATORS: StrictMap<CommandType, ICommandValidator> = {
  do: ['NUMBER'],
  goto: ['URL'],
  let: ['VARIABLE', 'VALUE'],
  od: [],
  wait: ['NUMBER'],
  if: ['BOOL_EX'],
  elif: ['BOOL_EX'],
  else: [],
  fi: [],
};
