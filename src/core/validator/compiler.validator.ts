import { ICommand } from '../../shared/commands.interfaces';
import { VALIDATORS } from './validators';
import { isCommand, ICommandValidator, ArgumentType } from './validator.utils';
import { IMap } from '../../shared/general.interfaces';

const URL_VALIDATOR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export class CompilerValidator {
  public validate(command: ICommand, variables: IMap<any>) {
    return (
      this.validateCommand(command) &&
      this.validateLength(command, VALIDATORS[command.type]) &&
      this.validateArguments(command, VALIDATORS[command.type], variables)
    );
  }

  private validateCommand(command: ICommand) {
    return isCommand(command.type);
  }

  private validateLength(command: ICommand, validator: ICommandValidator) {
    return command.args.length === validator.length;
  }

  private validateArguments(command: ICommand, validator: ICommandValidator, variables: IMap<any>) {
    return command.args.map((a, i) => this.validateArgument(a, validator[i], variables)).every(b => b);
  }

  private validateArgument(arg: any, validator: ArgumentType, variables: IMap<any>) {
    if (this._validateArgument(arg, validator)) return true;
    if (typeof arg !== 'string' || !variables[arg]) return false;

    return this._validateArgument(variables[arg], validator);
  }

  private _validateArgument(arg: any, validator: ArgumentType) {
    switch (validator) {
      case 'STRING':
        return typeof arg === 'string' && arg.startsWith('"') && arg.endsWith('"');

      case 'NUMBER':
        return typeof arg === 'number';

      case 'BOOLEAN':
        return typeof arg === 'boolean';

      case 'URL':
        return typeof arg === 'string' && URL_VALIDATOR.test(arg);

      case 'VARIABLE':
        return typeof arg === 'string';

      case 'VALUE':
        return true;

      default:
        return false;
    }
  }
}
