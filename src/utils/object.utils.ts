export class ObjectUtils<T extends any> {
  public static _<S extends any>(o: S): ObjectUtils<S> {
    return new ObjectUtils<S>(o);
  }

  private object: T;

  private constructor(object: T) {
    this.object = object;
  }

  public assign(f: (key: string, value: any) => any) {
    Object.keys(this.object).forEach(k => (this.object[k] = f(k, this.object[k])));

    return this.object;
  }
}
