import { ContractObject } from "@truffle/contract-schema/spec";

// NOTE we do not use the regular ContractObject type here because
// @truffle/workflow-compile/new provides a different bytecode format than
// @truffle/contract-schema defines
export interface CompiledContract {
  contractName: string;
  abi: ContractObject["abi"];
  bytecode: DataModel.IBytecode;
  deployedBytecode: DataModel.IBytecode;
  sourceMap: string;
  deployedSourceMap: string;
  source: string;
  sourcePath: string;
  ast: object;
  compiler: {
    name: string;
    version: string;
  };
}

export interface Compilation {
  sourceIndexes: string[];
  contracts: CompiledContract[];
}

export interface Compilations {
  [compilerName: string]: Compilation;
}

export interface ContractBytecodes {
  createBytecode: DataModel.IBytecode;
  callBytecode: DataModel.IBytecode;
}

type Resource = {
  id: string;
};

export type IdObject<R extends Resource = Resource> = {
  [N in keyof R]: N extends "id" ? string : never
};

export const toIdObject = <R extends Resource>({ id }: R): IdObject<R> =>
  ({
    id
  } as IdObject<R>);

export interface LoadedContract {
  id: string;
  createBytecode: DataModel.IBytecode;
  callBytecode: DataModel.IBytecode;
}

export interface Request {
  mutation: string; // GraphQL request
  variables: {
    [name: string]: any;
  };
}

export interface Response {
  data: {
    workspace: any;
  };
}

/**
 * Output format of @truffle/workflow-compile/new
 */
export interface WorkflowCompileResult {
  compilations: Compilations;
  contracts: { [contractName: string]: ContractObject };
}
