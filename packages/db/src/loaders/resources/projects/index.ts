import { IdObject, Request } from "@truffle/db/loaders/types";

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
): Generator<Request, IdObject, ProjectsAddResponse> {
  const result = yield {
    mutation: AddProjects,
    variables: {
      projects: [{ directory }]
    }
  };

  const { id } = result.data.workspace.projectsAdd.projects[0];
  return { id };
}
