import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Loading from "./Loading"

export default function ProtectedRoute({
    children,
    requiredRole,
    redirectTo = "/login",
}) {
    const { user, profile, loading } = useAuth()

    if (loading) {
        return <Loading />
    }

    // Not logged in → redirect to login
    if (!user) {
        return <Navigate to={redirectTo} replace />
    }

    // No profile yet → allow access, will use Guest defaults
    if (!profile) {
        return children
    }

    // Role mismatch - redirect to appropriate home
    if (requiredRole && profile.role !== requiredRole) {
        if (profile.role === "Admin") {
            return <Navigate to="/admin" replace />
        }
        // Member or Guest
        return <Navigate to="/" replace />
    }

    return children
}
