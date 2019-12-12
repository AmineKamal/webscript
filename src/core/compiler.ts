import { CompileBuilder } from './build/builder';
import * as fs from 'fs';
import { ICompilerOptions } from '..';
import { IRunCommand } from '../utils/type.utils';

export class Compiler {
  private builder: CompileBuilder = new CompileBuilder();

  public compile(options: ICompilerOptions) {
    const input = options.from && options.from === 'path' ? this.load(options.input) : options.input;
    if (options.resetContext) this.builder = new CompileBuilder();

    const { commands, errors } = this.builder.build(input);

    if (!commands) return { errors };
    if (options.buildOutput) this.save(options.buildOutput, commands);

    return { commands };
  }

  private load(path: string) {
    return fs.readFileSync(path, 'utf8');
  }

  private save(path: string, commands: IRunCommand[]) {
    fs.writeFileSync(path, JSON.stringify(commands));
  }
}
