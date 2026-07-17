import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { validateToken } from '../../api/Authentication/authenticationManagement';

const ProtectedRoute = ({
    children,
    allowedRoles = []
}) => {

    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    const location = useLocation();

    useEffect(() => {

        const checkAuth = async () => {

            try {

                const res = await validateToken();

                const userRole = res?.data?.role;

                if (
                    userRole &&
                    allowedRoles.includes(userRole)
                ) {

                    setAuthorized(true);

                } else {

                    setAuthorized(false);

                }

            } catch (err) {

                console.log("validate failed:", err);
                setAuthorized(false);

            } finally {

                setLoading(false);

            }

        };

        checkAuth();

    }, [location.pathname, allowedRoles]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authorized) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;