import { Compiler } from './core/compiler';
import { Runner } from './generator/runner';

export interface ICompilerOptions extends IRunnerOptions {
  buildOutput?: string;
  resetContext?: boolean;
}

export interface IBrowserOptions {
  browser?: 'CHROME';
  headless?: boolean;
}

export interface IRunnerOptions {
  from?: 'path' | 'input';
  input: string;
  opts?: IBrowserOptions;
  continue?: boolean;
}

export class WebscriptCompiler {
  private compiler = new Compiler();
  private runner = new Runner();

  public async init(opt: IBrowserOptions) {
    this.runner.init(opt);
  }

  public async compileAndRun(options: ICompilerOptions) {
    const commands = this.compile(options);
    if (!commands) return;

    options.input = JSON.stringify(commands);
    options.from = 'input';
    // console.log('Press any key to exit');

    // process.stdin.setRawMode(true);
    // process.stdin.resume();
    // process.stdin.on('data', process.exit.bind(process, 0));
    await this.run(options);
  }

  public compile(options: ICompilerOptions) {
    const out = this.compiler.compile(options);
    // tslint:disable-next-line:no-console
    if (out.errors) console.error('ERROR : ', out.errors);
    if (out.commands) return out.commands;
  }

  public async run(options: IRunnerOptions) {
    await this.runner.run(options);
  }

  public async close() {
    this.runner.finish();
  }
}
