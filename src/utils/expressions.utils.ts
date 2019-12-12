import { Stack, StrictMap, Map } from './structures.utils';
import { VariableType, find, check, mock, is } from './type.utils';

// tslint:disable:max-classes-per-file

const NON_OPERANDS = [' ', '\n', '\r', ''];

class InfixToPostfix {
  private infix!: string;
  private postfix: string[] = [];
  private stack: Stack<string> = new Stack('(');
  private operators: string[];

  /**
   * @param infix
   * @param sortedOperators Sorted from highest precedence to lowest
   */
  public constructor(sortedOperators: string[]) {
    this.operators = sortedOperators;
  }

  public convert(infix: string) {
    this.stack.clear();
    this.infix = infix + ')';
    this.split().forEach(c => this.apply(c));
    return this.postfix;
  }

  private split() {
    let chars: string[] = [];
    let char = '';
    const delimiters = ['(', ')', ...this.operators, ...NON_OPERANDS];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.infix.length; i++) {
      const c = this.infix.charAt(i);
      const del = delimiters.find(d => char.startsWith(d) || char.endsWith(d));

      if (del) {
        [char] = char.split(del);
        chars = [...chars, char, del];
        char = '';
      } else if (delimiters.includes(c)) {
        const next = c + this.infix.charAt(i + 1);

        if ([c, next].every(e => this.operators.includes(e))) chars = [...chars, char, c + this.infix.charAt(++i)];
        else chars = [...chars, char, c];

        char = '';
      } else char += c;
    }

    return chars.filter(c => !NON_OPERANDS.includes(c));
  }

  private apply(c: string) {
    if (c === '(') return this.stack.push(c);

    if (c === ')') {
      while (this.stack.peek() !== '(') this.postfix.push(this.stack.pop() as string);
      return this.stack.pop();
    }

    if (!this.operators.includes(c)) return this.postfix.push(c);

    while (this.precedence(c, this.stack.peek())) this.postfix.push(this.stack.pop() as string);
    this.stack.push(c);
  }

  private precedence(opA: string, opB?: string) {
    if (['(', ')', undefined].includes(opB)) return false;
    return this.operators.indexOf(opA) >= this.operators.indexOf(opB as string);
  }
}

type OpOutput<O> = [boolean, O];
type OpEquation<O> = (a: any, b?: any) => OpOutput<O>;

class ExpressionSolver<O extends string> {
  private ops: StrictMap<O, OpEquation<any>>;
  private opkeys: string[];
  private inToPos: InfixToPostfix;
  private stack: Stack<any> = new Stack();

  public constructor(ops: StrictMap<O, OpEquation<any>>) {
    this.ops = ops;
    this.opkeys = Object.keys(ops);
    this.inToPos = new InfixToPostfix(this.opkeys);
  }

  public validate(ex: string, variables: Map<[VariableType, any]>, soft = true): boolean {
    this.stack.clear();
    const postfix = this.inToPos.convert(ex);
    for (const e of postfix) if (!this.apply(e, variables, soft)) return false;
    return true;
  }

  public solve(ex: string, variables: Map<[VariableType, any]>): O | undefined {
    if (this.validate(ex, variables, false)) return this.stack.pop() as O;
    return undefined;
  }

  private apply(e: string, variables: Map<[VariableType, any]>, soft: boolean) {
    if (this.isOp(e)) return this.performOp(e);

    const v = this.extractValue(e, variables, soft);
    if (!v) return false;

    this.stack.push(v);
    return true;
  }

  private extractValue(e: string, variables: Map<[VariableType, any]>, soft: boolean): any | undefined {
    if (variables[e]) {
      const vr = check(variables[e]) ? variables[e][1] : soft ? mock[variables[e][0]] : undefined;
      return vr;
    }

    const ev = find(e);
    return ev ? ev[1][1] : undefined;
  }

  private isOp(e: string): e is O {
    return this.opkeys.includes(e);
  }

  private performOp(o: O) {
    const b = this.stack.pop();
    let out: OpOutput<O>;

    if (this.ops[o].length < 2) out = this.ops[o](b);
    else out = this.ops[o](this.stack.pop(), b);

    const [r, v] = out;
    this.stack.push(v);

    return r;
  }
}

type BooleanOp = '>' | '<' | '>=' | '<=' | '==' | '!=' | '!' | '&&' | '||';
const BOOLEAN_OPS: StrictMap<BooleanOp, OpEquation<boolean>> = {
  '>': (a, b) => [is.NUMBER(a) && is.NUMBER(b), a > b!],
  '<': (a, b) => [is.NUMBER(a) && is.NUMBER(b), a < b!],
  '!=': (a, b) => [typeof a === typeof b, a !== b!],
  '==': (a, b) => [typeof a === typeof b, a === b!],
  '<=': (a, b) => [is.NUMBER(a) && is.NUMBER(b), a <= b!],
  '>=': (a, b) => [is.NUMBER(a) && is.NUMBER(b), a >= b!],
  '!': a => [is.BOOLEAN(a), !a],
  '&&': (a, b) => [is.BOOLEAN(a) && is.BOOLEAN(b), a && b!],
  '||': (a, b) => [is.BOOLEAN(a) && is.BOOLEAN(b), a || b!],
};

type NumericalOp = '^' | '*' | '/' | '+' | '-';
const NUMERICAL_OPS: StrictMap<NumericalOp, OpEquation<number>> = {
  '^': (a, b) => [is.NUMBER(a) && is.NUMBER(b), Math.pow(a, b!)],
  '*': (a, b) => [is.NUMBER(a) && is.NUMBER(b), a * b!],
  '/': (a, b) => [is.NUMBER(a) && is.NUMBER(b), a / b!],
  '+': (a, b) => [is.NUMBER(a) && is.NUMBER(b), a + b!],
  '-': (a, b) => [is.NUMBER(a) && is.NUMBER(b), a - b!],
};

const BooleanExpressionSolver = new ExpressionSolver(BOOLEAN_OPS);
const NumericalExpressionSolver = new ExpressionSolver(NUMERICAL_OPS);
