import { memo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const CatchRoute = memo(function CatchRoute({ to, relative }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let path: string = to;
    const options = { replace: true };
    if (relative) {
      path = `${location.pathname}${to}`;
    }
    navigate(path, options);
  }, [location, relative, to, navigate]);
  return null;
});

interface Props {
  to: string;
  relative?: boolean;
}
