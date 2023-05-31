import React, { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AuthRoute({
  children,
}: {
  children: JSX.Element;
}): ReactElement {
  const auth = useAuth();
  const location = useLocation();

  if (auth?.user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}
