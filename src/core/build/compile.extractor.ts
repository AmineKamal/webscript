import { isCommand, ArgumentType } from '../validator/validator.utils';
import { VALIDATORS } from '../validator/validators';

export class CompileExtractor {
  public static extract(type: string, params: string[]) {
    if (!isCommand(type)) return undefined;
    const expected = VALIDATORS[type];
    const args = this._extract(expected, params);

    return args ? { type, args } : args;
  }

  private static _extract(expected: ArgumentType[], args: string[]) {
    const extracted: string[] = [];

    for (const type of expected) {
      switch (type) {
        case 'BOOL_EX':
          const boolEx = this.extractExpression('b', args);
          if (!boolEx) return undefined;
          extracted.push(boolEx);
          break;

        case 'NUM_EX':
          const numEx = this.extractExpression('n', args);
          if (!numEx) return undefined;
          extracted.push(numEx);
          break;

        case 'VALUE':
          let ex: string | undefined = '';

          if (this.isExpression('b', args)) ex = this.extractExpression('b', args);
          else if (this.isExpression('n', args)) ex = this.extractExpression('n', args);
          else ex = args.shift();

          if (!ex) return undefined;
          extracted.push(ex);
          break;

        default:
          const arg = args.shift();
          if (!arg) return undefined;
          extracted.push(arg);
          break;
      }
    }

    return extracted;
  }

  private static isExpression(delimiter: string, args: string[]) {
    return args[0] && args[0].startsWith(delimiter + '{');
  }

  private static extractExpression(delimiter: string, args: string[]) {
    let ex = args.shift();
    if (!ex || !ex.startsWith(delimiter + '{')) return undefined;
    ex = ex.split('{').pop() as string;

    while (args[0] && !args[0].endsWith('}')) ex += args.shift();
    if (!args[0]) return undefined;

    return ex + (args.shift() as string).split('}').shift();
  }
}
