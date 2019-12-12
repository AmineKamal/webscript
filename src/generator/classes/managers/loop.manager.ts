import { Stack } from '../../../utils/structures.utils';

export interface ILoop {
  command: number;
  times?: number;
}

export class LoopManager {
  private loops: Stack<ILoop> = new Stack<ILoop>();

  public do(command: number, times: number) {
    this.loops.push({ command, times });
  }

  public od(current: number) {
    const loop = this.loops.peek();
    if (!loop || !loop.times) return current;

    loop.times--;

    const i = loop.times > 0 ? loop.command : current;
    if (loop.times <= 0) this.loops.pop();

    return i;
  }
}
