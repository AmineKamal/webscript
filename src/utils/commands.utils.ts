import { StrictMap } from './structures.utils';
import { CommandType, ArgumentType } from './type.utils';

class CommandKeys implements StrictMap<CommandType, readonly string[]> {
  public do = ['n'] as const;
  public goto = ['url'] as const;
  public let = ['variable', 'value'] as const;
  public od = [] as const;
  public wait = ['time'] as const;
  public if = ['ex'] as const;
  public elif = ['ex'] as const;
  public else = [] as const;
  public fi = [] as const;
  public click = ['selector'] as const;
}

export const COMMAND_KEYS = new CommandKeys();

export const COMMAND_VALIDATORS: StrictMap<CommandType, readonly ArgumentType[]> = {
  do: ['NUMBER'],
  goto: ['URL'],
  let: ['VARIABLE', 'VALUE'],
  od: [],
  wait: ['NUMBER'],
  if: ['BOOL_EX'],
  elif: ['BOOL_EX'],
  else: [],
  fi: [],
  click: ['STRING'],
} as const;
