import { memo, useMemo } from "react";
import { GradientBorderLink } from "Components/GradientBorderButton";
import { AdminRoutes } from "Router/AdminRoutes";
import { currentProperty, useProperties } from "State/Properties";

export const TabLink = memo(function TabLink({ route }: Props) {
  const { slug } = useProperties(currentProperty);
  const display = useMemo(() => route.replace(/-/g, " "), [route]);
  const link = useMemo(() => AdminRoutes.slugRoute(slug, route), [slug, route]);
  return <GradientBorderLink to={link}>{display}</GradientBorderLink>;
});

interface Props {
  route: string;
}
