import { StrictMap } from '../../shared/general.interfaces';
import { ICommandValidator } from './validator.utils';
import { CommandType } from '../../shared/commands.interfaces';

export const VALIDATORS: StrictMap<CommandType, ICommandValidator> = {
  do: ['NUMBER'],
  goto: ['URL'],
  let: ['VARIABLE', 'VALUE'],
  od: [],
  wait: ['NUMBER'],
};
