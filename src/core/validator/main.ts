import { ICommand, isCommand, ICommandValidator, ArgumentType, VariableType } from '../../utils/type.utils';
import { Map } from '../../utils/structures.utils';
import { BooleanExpressionSolver, NumericalExpressionSolver } from '../../utils/expressions.utils';
import { COMMAND_VALIDATORS } from '../../utils/commands.utils';

const URL_VALIDATOR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export class CompilerValidator {
  public validate(command: ICommand, variables: Map<[VariableType, any]>) {
    return (
      this.validateCommand(command) &&
      this.validateLength(command, COMMAND_VALIDATORS[command.type]) &&
      this.validateArguments(command, COMMAND_VALIDATORS[command.type], variables)
    );
  }

  private validateCommand(command: ICommand) {
    return isCommand(command.type);
  }

  private validateLength(command: ICommand, validator: ICommandValidator) {
    return command.args.length === validator.length;
  }

  private validateArguments(command: ICommand, validator: ICommandValidator, variables: Map<[VariableType, any]>) {
    return command.args.map((a, i) => this.validateArgument(a, validator[i], variables)).every(b => b);
  }

  private validateArgument(arg: any, validator: ArgumentType, variables: Map<[VariableType, any]>) {
    if (this._validateArgument(arg, validator, variables)) return true;
    if (typeof arg !== 'string' || !variables[arg]) return false;

    return this._validateArgument(variables[arg][1], validator, variables);
  }

  private _validateArgument(arg: any, validator: ArgumentType, variables: Map<[VariableType, any]>) {
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

      case 'BOOL_EX':
        return BooleanExpressionSolver.validate(arg, variables);

      case 'NUM_EX':
        return NumericalExpressionSolver.validate(arg, variables);

      default:
        return false;
    }
  }
}
