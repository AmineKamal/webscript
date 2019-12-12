import { Map } from '../../utils/structures.utils';
import { ICommand, isCommand, ArgumentType, VariableType } from '../../utils/type.utils';
import { COMMAND_VALIDATORS } from '../../utils/commands.utils';

export interface IRawCommand {
  type: string;
  args: string[];
}

export class CompileParser {
  private variable?: string;

  public parse(raw: IRawCommand, variables: Map<[VariableType, any]>): ICommand | undefined {
    this.variable = undefined;

    if (!isCommand(raw.type)) return undefined;

    const args = COMMAND_VALIDATORS[raw.type].map((v, i) => this.try(raw.args[i], v, variables));
    if (args.some(a => a === undefined)) return undefined;

    return { type: raw.type, args };
  }

  private try(arg: string, type: ArgumentType, variables: Map<[VariableType, any]>): any {
    switch (type) {
      case 'STRING':
      case 'URL':
      case 'BOOL_EX':
      case 'NUM_EX':
        return arg;

      case 'NUMBER':
        return isNaN(parseFloat(arg)) ? arg : parseFloat(arg);

      case 'BOOLEAN':
        return arg === 'true' ? true : arg === 'false' ? false : arg;

      case 'VARIABLE':
        this.variable = arg;
        return arg;

      case 'VALUE':
        const value = this.tryValue(arg);
        if (this.variable) variables[this.variable] = value;
        this.variable = undefined;
        return value;

      default:
        return undefined;
    }
  }

  private tryValue(arg: string): [VariableType, any] {
    let v = this.try(arg, 'BOOLEAN', {});
    if (typeof v === 'boolean') return ['BOOLEAN', v];

    v = this.try(arg, 'NUMBER', {});
    if (typeof v === 'number') return ['NUMBER', v];

    if (arg.startsWith('"') && arg.startsWith('"')) return ['STRING', v];

    return ['URL', arg];
  }
}
