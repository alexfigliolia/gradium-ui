import { memo, useCallback } from "react";
import { Card } from "Components/Card";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { NewLease } from "State/LeaseCRUD";
import { Leases } from "State/Leases";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const Space = memo(function Space({ name, id, children }: Props) {
  const onClick = useCallback(() => {
    NewLease.setUnit(id.toString());
    Leases.newLease.open();
  }, [id]);
  return (
    <Card className="space-card">
      <h3>{name}</h3>
      {children}
      <GradientBorderButton onClick={onClick}>Add Lease</GradientBorderButton>
    </Card>
  );
});

interface Props extends OptionalChildren {
  id: number;
  name: string;
}
