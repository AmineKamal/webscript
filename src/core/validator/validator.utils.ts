import { COMMAND_TYPES, CommandType } from '../../shared/commands.interfaces';

export type ICommandValidator = ArgumentType[];

export type VariableType = 'URL' | 'STRING' | 'BOOLEAN' | 'NUMBER';
export type ArgumentType = VariableType | 'VARIABLE' | 'VALUE' | 'BOOL_EX' | 'NUM_EX';
const VARIABLE_TYPES: VariableType[] = ['URL', 'STRING', 'BOOLEAN', 'NUMBER'];

export const isCommand = (c => COMMAND_TYPES.includes(c as CommandType)) as (c: string) => c is CommandType;
export const isVariable = (a => VARIABLE_TYPES.includes(a as VariableType)) as (a: string) => a is VariableType;
