import { memo, useMemo } from "react";
import type { PersonRoleType } from "GraphQL/Types";
import { Scope } from "State/Scope";
import type { Props as RelativeLinkProps } from "./RelativeLink";
import { RelativeLink } from "./RelativeLink";

export const PermissedLink = memo(function PermissedLink({
  requirements,
  ...rest
}: Props) {
  const accepted = useMemo(
    () => Scope.hasPermissions(...requirements),
    [requirements],
  );
  if (!accepted) {
    return null;
  }
  return <RelativeLink {...rest} />;
});

interface Props extends RelativeLinkProps {
  requirements: PersonRoleType[];
}
