import * as readline from 'readline';
import { WebscriptCompiler, ICompilerOptions } from '.';
import * as argparse from 'argparse';

interface ICLIOptions {
  b: string | null;
  r: string | null;
  br: string | null;
  it: boolean;
  o: string | null;
  headless: boolean;
}

const QUIT_COMMANDS = ['q', 'Q', 'Quit', 'quit'];

class CLI {
  private args: ICLIOptions;
  private rd!: readline.Interface;
  private compiler: WebscriptCompiler;

  public constructor() {
    this.args = this.argparse();
    this.compiler = new WebscriptCompiler();
  }

  public init() {
    if (!this.args.it) return this.execute();
    this.listen();
  }

  private argparse() {
    const parser = new argparse.ArgumentParser({ addHelp: true, description: 'WebScript CLI' });
    const group = parser.addMutuallyExclusiveGroup({ required: true });
    group.addArgument(['-b'], { help: 'Builds a .ws file.', metavar: 'path' });
    group.addArgument(['-r'], { help: 'Runs a .wso file.', metavar: 'path' });
    group.addArgument(['-br'], { help: 'Builds and runs a .ws file', metavar: 'path' });
    group.addArgument(['-it'], { help: 'Runs in CLI in interactive mode.', action: 'storeTrue' });
    parser.addArgument(['-o'], { help: 'Outputs the build at the specified path.', metavar: 'path' });
    parser.addArgument(['--headless'], { help: 'Runs the browser in headless mode (no GUI).', action: 'storeTrue' });
    return parser.parseArgs();
  }

  private execute() {
    const from: 'path' = 'path';
    const opt = this.args.b ? 'b' : this.args.r ? 'r' : 'br';
    const input = this.args[opt]!;
    const buildOutput = this.args.o ? this.args.o : undefined;
    const options: ICompilerOptions = { from, input, buildOutput, opts: { headless: this.args.headless } };

    switch (opt) {
      case 'b':
        return this.compiler.compile(options);

      case 'r':
        return this.compiler.run(options);

      case 'br':
        return this.compiler.compileAndRun(options);

      default:
        // tslint:disable-next-line:no-console
        console.error('Command not recognized.');
    }
  }

  private async listen() {
    await this.compiler.init({ headless: false });
    this.rd = readline.createInterface({ input: process.stdin, output: process.stdout });
    this.question();
  }

  private question() {
    this.rd.question('>>> ', c => this.run(c));
  }

  private async run(command: string) {
    if (QUIT_COMMANDS.includes(command)) return await this.stop();
    await this.compiler.compileAndRun({ input: command, continue: true });
    this.question();
  }

  private async stop() {
    this.rd.close();
    await this.compiler.close();
  }
}

const cli = new CLI();
cli.init();
