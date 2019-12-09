export type StrictMap<K extends string, V> = { [key in K]: V };

export interface IMap<V> {
  [key: string]: V;
}

export type Pair<V> = [V, V];
