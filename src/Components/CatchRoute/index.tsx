import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Location } from "Tools/Location";

export const CatchRoute = memo(function CatchRoute({ base, to }: Props) {
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    navigate(Location.pathFromDefinition(base, params, to), { replace: true });
  }, [navigate, params, base, to]);
  return null;
});

interface Props {
  to: string;
  base: string;
}
