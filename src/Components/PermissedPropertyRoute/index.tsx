import type { ReactNode } from "react";
import { memo, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useAccessControlCallback } from "Hooks/useAccessControlCallback";
import { usePropertyAccess } from "Hooks/usePropertyAccess";
import { grants, useScope } from "State/Scope";
import { Permission } from "Tools/Permission";
import type { Callback } from "Types/Generics";
import type { AccessControl } from "Types/Permission";
import type { OptionalChildren } from "Types/React";

export const PermissedPropertyRoute = memo(function PermissedPropertyRoute({
  children,
  onAttempt,
  requirements,
  fallback = null,
}: Props) {
  const userGrants = useScope(grants);
  const hasAddon = usePropertyAccess(...requirements.addons);
  const granted = useMemo(() => {
    return (
      hasAddon &&
      Permission.hasPermission(userGrants, ...requirements.permissions)
    );
  }, [userGrants, requirements.permissions, hasAddon]);

  useAccessControlCallback({
    granted,
    onAttempt,
    requirements,
  });

  if (!granted) {
    if (typeof fallback === "string") {
      return <Navigate replace to={fallback} />;
    }
    return fallback;
  }
  return children;
});

interface Props extends OptionalChildren {
  onAttempt?: Callback;
  requirements: AccessControl;
  fallback?: ReactNode;
}
