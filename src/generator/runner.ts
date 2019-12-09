import { IRunnerOptions, IBrowserOptions } from '..';
import * as fs from 'fs';
import { IRunCommand, CommandType } from '../shared/commands.interfaces';
import { COMMANDS } from './commands/commands';
import { IMap } from '../shared/general.interfaces';
import { LoopManager } from './classes/managers/loop.manager';
import { ObjectUtils } from '../utils/object.utils';
import { BaseBrowser } from './classes/browsers/base.browser';
import { Browser } from './classes/browsers/browser';

export class Runner {
  public browser!: BaseBrowser<any, any>;
  public variables: IMap<any> = {};
  public loopManager: LoopManager = new LoopManager();
  public i: number = -1;
  private commands: IRunCommand[] = [];

  public async init(opt?: IBrowserOptions) {
    await this.initialize(opt);
  }

  public async run(options: IRunnerOptions) {
    const input = options.from && options.from === 'path' ? this.load(options.input) : options.input;
    this.commands = [...this.commands, ...JSON.parse(input)];
    await this.initialize(options.opts);
    await this.next();
    if (!options.continue) await this.finish();
  }

  public async finish() {
    await this.browser.finish();
  }

  private load(path: string) {
    return fs.readFileSync(path, 'utf8');
  }

  private async initialize(opts?: IBrowserOptions) {
    if (!this.browser) this.browser = await Browser._(opts);
  }

  private async next() {
    if (this.i >= this.commands.length - 1) return;
    const command = this.command;
    await COMMANDS[command.type](this, this.input(command));
    await this.next();
  }

  private get command() {
    return this.commands[++this.i];
  }

  private input(c: IRunCommand) {
    return ObjectUtils._(c).assign((k, v) => (this.isVariable(v, k, c.type) ? this.variables[v] : v));
  }

  private isVariable(input: any, key: string, type: CommandType) {
    return (
      (key !== 'variable' || type !== 'let') &&
      typeof input === 'string' &&
      !input.startsWith('"') &&
      !input.endsWith('"') &&
      this.variables[input]
    );
  }
}
