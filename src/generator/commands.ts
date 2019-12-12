import { CommandType, ICommandRunnable } from '../utils/type.utils';
import { Runner } from './runner';
import { COMMAND_KEYS } from '../utils/commands.utils';
import { StrictMap, Implements } from '../utils/structures.utils';

/**
 *  VARIABLES MANAGEMENT
 */

/* LET */
type StrictLet = StrictMap<typeof COMMAND_KEYS.let[number], any>;
interface ILetCommand extends Implements<StrictLet, ILetCommand> {
  variable: string;
  value: any;
}

const LET: ICommandRunnable<ILetCommand, void> = async (runner: Runner, input: ILetCommand) => {
  runner.variables[input.variable] = input.value;
};

/**
 *  LOOPS MANAGEMENT
 */

/* DO */
type StrictDo = StrictMap<typeof COMMAND_KEYS.do[number], any>;
interface IDoCommand extends Implements<StrictDo, IDoCommand> {
  n: number;
}

const DO: ICommandRunnable<IDoCommand, void> = async (runner: Runner, input: IDoCommand) => {
  runner.loopManager.do(runner.i, input.n);
};

/* OD */
type StrictOd = StrictMap<typeof COMMAND_KEYS.od[number], any>;
interface IOdCommand extends Implements<StrictOd, IOdCommand> {}

const OD: ICommandRunnable<{}, void> = async (runner: Runner, _: IOdCommand) => {
  runner.i = runner.loopManager.od(runner.i);
};

/**
 *  BROWSER COMMANDS
 */

/* GOTO */
type StrictGoto = StrictMap<typeof COMMAND_KEYS.goto[number], any>;
interface IGotoCommand extends Implements<StrictGoto, IGotoCommand> {
  url: string;
}

const GOTO: ICommandRunnable<IGotoCommand, void> = async (runner: Runner, input: IGotoCommand) => {
  await runner.browser.goto(input.url);
};

/* WAIT */
type StrictWait = StrictMap<typeof COMMAND_KEYS.wait[number], any>;
interface IWaitCommand extends Implements<StrictWait, IWaitCommand> {
  time: number;
}

const WAIT: ICommandRunnable<IWaitCommand, void> = async (runner: Runner, input: IWaitCommand) => {
  await runner.browser.wait(input.time);
};

/**
 * CONDITIONS MANAGEMENT
 */

/* IF */
type StrictIf = StrictMap<typeof COMMAND_KEYS.if[number], any>;
interface IIfCommand extends Implements<StrictIf, IIfCommand> {
  ex: string;
}

const IF: ICommandRunnable<IIfCommand, void> = async (runner: Runner, input: IIfCommand) => {
  runner.skip = runner.conditionManager.if(input.ex, runner.variables);
};

/* ELIF */
type StrictElif = StrictMap<typeof COMMAND_KEYS.elif[number], any>;
interface IElifCommand extends Implements<StrictElif, IElifCommand> {
  ex: string;
}

const ELIF: ICommandRunnable<IElifCommand, void> = async (runner: Runner, input: IElifCommand) => {
  runner.skip = runner.conditionManager.elif(input.ex, runner.variables);
};

/* ELSE */
type StrictElse = StrictMap<typeof COMMAND_KEYS.else[number], any>;
interface IElseCommand extends Implements<StrictElse, IElseCommand> {}

const ELSE: ICommandRunnable<{}, void> = async (runner: Runner, _: IElseCommand) => {
  runner.skip = runner.conditionManager.else();
};

/* FI */
type StrictFi = StrictMap<typeof COMMAND_KEYS.fi[number], any>;
interface IFiCommand extends Implements<StrictFi, IFiCommand> {}

const FI: ICommandRunnable<{}, void> = async (runner: Runner, _: IFiCommand) => {
  runner.skip = runner.conditionManager.fi();
};

export const COMMANDS: StrictMap<CommandType, ICommandRunnable<any, any>> = {
  let: LET,
  do: DO,
  od: OD,
  goto: GOTO,
  wait: WAIT,
  if: IF,
  elif: ELIF,
  else: ELSE,
  fi: FI,
};
