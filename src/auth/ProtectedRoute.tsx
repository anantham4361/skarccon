import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) return null; // or Loader

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
