import type { ReactNode } from "react";
import { memo, useMemo } from "react";
import { Navigate } from "react-router-dom";
import type { PersonRoleType } from "GraphQL/Types";
import { useAccessControlCallback } from "Hooks/useAccessControlCallback";
import { grants, useScope } from "State/Scope";
import { Permission } from "Tools/Permission";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";

export const PermissedRoute = memo(function PermissedRoute({
  children,
  onAttempt,
  requirements,
  fallback = null,
}: Props) {
  const userGrants = useScope(grants);
  const granted = useMemo(
    () => Permission.hasPermission(userGrants, ...requirements),
    [userGrants, requirements],
  );

  useAccessControlCallback({
    granted,
    onAttempt,
    requirements,
  });

  if (!granted) {
    if (typeof fallback === "string" && fallback.startsWith("/")) {
      return <Navigate to={fallback} />;
    }
    return fallback;
  }
  return children;
});

interface Props extends OptionalChildren {
  onAttempt?: Callback;
  fallback?: ReactNode;
  requirements: PersonRoleType[];
}
