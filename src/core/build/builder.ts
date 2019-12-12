import { IRawCommand, CompileParser } from './parser';
import { CompilerValidator } from '../validator/main';
import { MAP } from './map';
import { Map } from '../../utils/structures.utils';
import { LoopValidator } from '../validator/loop';
import { CompileExtractor } from './extractor';
import { IRunCommand, ICommand, isCommand, VariableType } from '../../utils/type.utils';

export type CompilerBuilderError = [number, string];

export interface ICompileBuilderOutput {
  commands?: IRunCommand[];
  errors?: CompilerBuilderError[];
}

export class CompileBuilder {
  private errors: CompilerBuilderError[] = [];
  private input!: string;
  private parser = new CompileParser();
  private validator = new CompilerValidator();
  private loopValidator = new LoopValidator();
  private variables: Map<[VariableType, any]> = {};

  public build(input: string): ICompileBuilderOutput {
    this.reset(input);

    const statements = this.skim(this.input.split(';'));

    const raw = statements.map((st, i) => this.extract(st, i));
    if (this.isError()) return { errors: this.errors };

    const commands = raw.map((r, i) => this.parse(r, i));
    if (this.isError()) return { errors: this.errors };

    commands.forEach((c, i) => this.validate(c, i));
    if (this.isError()) return { errors: this.errors };

    commands.forEach((c, i) => this.validateLoop(c, i));
    if (this.isError()) return { errors: this.errors };

    const mapped = commands.map((c, i) => this.map(c, i));
    if (this.isError()) return { errors: this.errors };

    return { commands: mapped };
  }

  private reset(input: string) {
    this.input = input.trim();
    this.errors = [];
  }

  private skim(args: string[]) {
    return args.filter(a => a !== '').map(c => c.trim());
  }

  private extract(statement: string, i: number): IRawCommand {
    const args = this.skim(statement.split(' '));
    const type = args.shift();
    let extracted: IRawCommand | undefined;

    if (typeof type === 'undefined') this.error(i, 'Syntax Error');
    else extracted = CompileExtractor.extract(type, args);

    if (typeof extracted === 'undefined') this.error(i, 'Syntax Error');

    return extracted as IRawCommand;
  }

  private parse(raw: IRawCommand, i: number) {
    const command = this.parser.parse(raw, this.variables);
    if (!command) this.error(i, 'Parsing Error');

    return command as ICommand;
  }

  private validate(command: ICommand, i: number) {
    if (!this.validator.validate(command, this.variables)) this.error(i, 'Validation Error');
  }

  private validateLoop(command: ICommand, i: number) {
    if (!this.loopValidator.validate(command)) this.error(i, 'Loop Error');
  }

  private map(command: ICommand, i: number) {
    const mapped = this._map(command);
    if (!mapped) this.error(i, 'Mapping Error');

    return mapped as IRunCommand;
  }

  private _map(command: ICommand): IRunCommand | undefined {
    if (!isCommand(command.type)) return undefined;
    if (MAP[command.type].length !== command.args.length) return undefined;

    const input: any = {};
    MAP[command.type].forEach((k, i) => (input[k] = command.args[i]));

    return { type: command.type, input };
  }

  private error(i: number, message: string) {
    this.errors.push([i, message]);
  }

  private isError() {
    return this.errors.length > 0;
  }
}
