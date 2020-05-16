import gql from "graphql-tag";

export const GetCompilation = gql`
  query GetCompilation($id: ID!) {
    workspace {
      compilation(id: $id) {
        id
        compiler {
          name
        }
      }
    }
  }
`;
