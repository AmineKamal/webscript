import { StrictMap } from './structures.utils';

const URL_VALIDATOR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export type VariableType = 'URL' | 'STRING' | 'BOOLEAN' | 'NUMBER';

type TypeVerifier<T> = (e: string) => [boolean, T];
class TypeParser implements StrictMap<VariableType, TypeVerifier<any>> {
  public NUMBER!: TypeVerifier<number>;
  public URL!: TypeVerifier<string>;
  public BOOLEAN!: TypeVerifier<boolean>;
  public STRING!: TypeVerifier<string>;
}

export const parser: TypeParser = {
  NUMBER: (e: string) => [!isNaN(parseFloat(e)), parseFloat(e)],
  URL: (e: string) => [URL_VALIDATOR.test(e), e],
  STRING: (e: string) => [e.startsWith('"') && e.endsWith('"'), e.substring(1, e.length - 1)],
  BOOLEAN: (e: string) => [['true', 'false'].includes(e), e === 'true'],
};

type TypeChecker = (v: any) => boolean;
export const is: StrictMap<VariableType, TypeChecker> = {
  NUMBER: (v: any) => typeof v === 'number',
  URL: (v: any) => URL_VALIDATOR.test(v),
  STRING: (v: any) => typeof v === 'string',
  BOOLEAN: (v: any) => typeof v === 'boolean',
};

export const mock: StrictMap<VariableType, any> = {
  NUMBER: 0,
  URL: 'url',
  STRING: 'string',
  BOOLEAN: true,
};

export const find: (e: string) => [VariableType, [boolean, any]] | undefined = e => {
  const evaluations: Array<[string, [boolean, any]]> = Object.entries(parser).map(([k, v]) => [k, v(e)]);
  return evaluations.find(ev => ev[1][0]) as [VariableType, [boolean, any]] | undefined;
};

export const check: (v: [VariableType, any]) => boolean = v => {
  return is[v[0]](v[1]);
};
