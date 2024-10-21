import { memo, useMemo } from "react";
import type { PersonRoleType } from "GraphQL/Types";
import { grants, useScope } from "State/Scope";
import { Permission } from "Tools/Permission";
import type { Props as RelativeLinkProps } from "./RelativeLink";
import { RelativeLink } from "./RelativeLink";

export const PermissedLink = memo(function PermissedLink({
  requirements,
  ...rest
}: Props) {
  const permissions = useScope(grants);
  const accepted = useMemo(
    () => Permission.hasPermission(permissions, ...requirements),
    [requirements, permissions],
  );
  if (!accepted) {
    return null;
  }
  return <RelativeLink {...rest} />;
});

interface Props extends RelativeLinkProps {
  requirements: PersonRoleType[];
}
