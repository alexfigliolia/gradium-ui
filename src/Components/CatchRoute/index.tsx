import { memo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const CatchRoute = memo(function CatchRoute({ to, relative }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (relative) {
      return navigate(`${location.pathname}${to}`);
    }
    navigate(to);
  }, [location, relative, to, navigate]);
  return null;
});

interface Props {
  to: string;
  relative?: boolean;
}
