import { Stack, Map } from '../../../utils/structures.utils';
import { BooleanExpressionSolver } from '../../../utils/expressions.utils';
import { VariableType } from '../../../utils/type.utils';

interface ICondition {
  current: 'if' | 'elif' | 'else';
  if: boolean;
  elif: boolean[];
  else?: boolean;
}

export class ConditionManager {
  private conditions: Stack<ICondition> = new Stack();

  public if(ex: string, variables: Map<[VariableType, any]>): boolean {
    const ev = this.eval(ex, variables);
    this.conditions.push({ current: 'if', if: ev, elif: [] });
    return !ev || !this.checkParent();
  }

  public elif(ex: string, variables: Map<[VariableType, any]>): boolean {
    this.conditions.peek()!.current = 'elif';
    if (this.conditions.peek()!.if || this.conditions.peek()!.elif.some(c => c)) return true;

    const ev = this.eval(ex, variables);
    this.conditions.peek()!.elif.push(ev);
    return !ev || !this.checkParent();
  }

  public else(): boolean {
    this.conditions.peek()!.current = 'else';
    if (this.conditions.peek()!.if || this.conditions.peek()!.elif.some(c => c)) return true;
    this.conditions.peek()!.else = true;
    return false || !this.checkParent();
  }

  public fi() {
    this.conditions.pop();
    return false;
  }

  private checkParent() {
    const parent = this.conditions.peek(1);
    if (!parent) return true;

    const c = parent[parent.current];
    return c ? (Array.isArray(c) ? c.length > 0 && c[c.length - 1] : c) : false;
  }

  private eval(ex: string, variables: Map<[VariableType, any]>) {
    return BooleanExpressionSolver.solve<boolean>(ex, variables) || false;
  }
}
