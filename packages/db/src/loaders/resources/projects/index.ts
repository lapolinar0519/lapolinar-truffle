import { IdObject, toIdObject, Request } from "@truffle/db/loaders/types";

import { AddProjects } from "./add.graphql";
import { AssignProjectNames } from "./assign.graphql";
import { ResolveProjectName } from "./resolve.graphql";
export { AddProjects, AssignProjectNames, ResolveProjectName };

interface ProjectsAddResponse {
  data: {
    workspace: {
      projectsAdd: {
        projects: {
          id: string;
        }[];
      };
    };
  };
}

export function* generateProjectLoad(
  directory: string
): Generator<Request, IdObject<DataModel.IProject>, ProjectsAddResponse> {
  const result = yield {
    mutation: AddProjects,
    variables: {
      projects: [{ directory }]
    }
  };

  return (result.data.workspace.projectsAdd.projects[0] as unknown) as IdObject<
    DataModel.IProject
  >;
}
