import { VALIDATORS } from '../validator/validators';
import { ICommand } from '../../shared/commands.interfaces';
import { isCommand, ArgumentType } from '../validator/validator.utils';
import { IMap } from '../../shared/general.interfaces';

export interface IRawCommand {
  type: string;
  args: string[];
}

export class CompileParser {
  private variable?: string;

  public parse(raw: IRawCommand, variables: IMap<any>): ICommand | undefined {
    this.variable = undefined;

    if (!isCommand(raw.type)) return undefined;

    const args = VALIDATORS[raw.type].map((v, i) => this.try(raw.args[i], v, variables));
    if (args.some(a => a === undefined)) return undefined;

    return { type: raw.type, args };
  }

  private try(arg: string, type: ArgumentType, variables: IMap<any>): any {
    switch (type) {
      case 'STRING':
      case 'URL':
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

  private tryValue(arg: string) {
    let v = this.try(arg, 'BOOLEAN', {});
    if (typeof v === 'boolean') return v;

    v = this.try(arg, 'NUMBER', {});
    if (typeof v === 'number') return v;

    return arg;
  }
}
