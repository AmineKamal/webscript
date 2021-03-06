// tslint:disable:max-classes-per-file
// tslint:disable:interface-over-type-literal

/**
 * TYPES
 */

export type StrictMap<K extends string, V> = { [key in K]: V };
export type Map<V> = IMap<V>;
export type Pair<V> = [V, V];
export type Implements<T, _U extends T> = {};

/**
 * INTERFACES
 */

interface IMap<V> {
  [key: string]: V;
}

/**
 *  CLASSES
 */

export class Stack<V> {
  private data: V[] = [];

  public constructor(initial?: V | V[]) {
    if (initial) this.push(initial);
  }

  public push(e: V | V[]) {
    this.data = [...this.data, ...(Array.isArray(e) ? e : [e])];
  }

  public pop(): V | undefined {
    return this.data.pop();
  }

  public peek(degree: number = 0): V | undefined {
    return this.data[this.data.length - (1 + degree)];
  }

  public reset(e?: V | V[]) {
    this.data = e ? [...(Array.isArray(e) ? e : [e])] : [];
  }

  public get length() {
    return this.data.length;
  }

  public get empty() {
    return this.data.length === 0;
  }
}

export class Queue<V> {
  private data: V[] = [];

  public constructor(initial?: V | V[]) {
    if (initial) this.enqueue(initial);
  }

  public enqueue(e: V | V[]) {
    this.data = [...this.data, ...(Array.isArray(e) ? e : [e])];
  }

  public dequeue(): V | undefined {
    return this.data.shift();
  }

  public peek(): V | undefined {
    return this.data[0];
  }

  public reset(e?: V | V[]) {
    this.data = e ? [...(Array.isArray(e) ? e : [e])] : [];
  }

  public get length() {
    return this.data.length;
  }

  public get empty() {
    return this.data.length === 0;
  }
}
