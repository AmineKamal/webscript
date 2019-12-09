export class Stack<V> {
  private data: V[] = [];

  public push(e: V) {
    this.data.push(e);
  }

  public pop(): V | undefined {
    return this.data.pop();
  }

  public peek(): V | undefined {
    return this.data[this.data.length - 1];
  }

  public get length() {
    return this.data.length;
  }
}
