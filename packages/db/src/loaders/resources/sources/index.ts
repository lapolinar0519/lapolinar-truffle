import {
  CompilationData,
  LoadedSources,
  IdObject,
  toIdObject,
  WorkspaceRequest,
  WorkspaceResponse
} from "@truffle/db/loaders/types";

import { AddSources } from "./add.graphql";
export { AddSources };

// returns list of IDs
export function* generateSourcesLoad(
  compilation: CompilationData
): Generator<
  WorkspaceRequest,
  LoadedSources,
  WorkspaceResponse<"sourcesAdd", DataModel.ISourcesAddPayload>
> {
  // for each compilation, we need to load sources for each of the contracts
  const inputs = compilation.sources.map(({ input }) => input);

  const result = yield {
    mutation: AddSources,
    variables: { sources: inputs }
  };

  const { sources } = result.data.workspace.sourcesAdd;

  // return source IDs mapped by sourcePath
  return sources.reduce(
    (obj, source) => ({
      ...obj,
      [source.sourcePath]: toIdObject(source)
    }),
    {}
  );
}
