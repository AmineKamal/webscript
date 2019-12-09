import { IMap } from '../shared/general.interfaces';

export class BoolExpressionUtils {
  public static _(ex: string) {
    return new BoolExpressionUtils(ex);
  }

  private ex: string;

  private constructor(args: string) {
    this.ex = args;
  }

  public validate(variables: IMap<any>) {
    return true;
  }

  public evaluate(variables: IMap<any>) {
    return;
  }

  private _validate(ex: string) {
    //
  }

  private isLogicOp(str: string) {
    return ['and', 'or', 'not'].includes(str);
  }

  private isBoolOp(str: string) {
    return ['==', '!=', '>=', '<='].includes(str);
  }
}
