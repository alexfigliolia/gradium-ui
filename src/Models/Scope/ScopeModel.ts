import { State } from "@figliolia/galena";
import { userScope } from "GraphQL/Queries/userScope.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  LoggedInUser,
  UserScopeQuery,
  UserScopeQueryVariables,
} from "GraphQL/Types";

export class ScopeModel extends State<LoggedInUser> {
  constructor() {
    super("Scope", {
      id: -1,
      name: "",
      email: "",
      affiliations: [],
    });
  }

  public initialize(scope: LoggedInUser) {
    this.update(state => {
      for (const key in scope) {
        // @ts-ignore
        state[key] = scope[key];
      }
    });
  }

  public async refetch() {
    const scope = await graphQLRequest<UserScopeQuery, UserScopeQueryVariables>(
      userScope,
      {
        id: this.getState().id,
      },
    );
    this.initialize(scope.userScope);
  }
}
