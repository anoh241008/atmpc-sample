import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { validateToken } from '../../api/Authentication/authenticationManagement';

const GuestRoute = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [hasToken, setHasToken] = useState(false);
    const [redirectPath, setRedirectPath] = useState(null);

    const location = useLocation();

    useEffect(() => {

        const checkAuth = async () => {

            try {

                const res = await validateToken();

                const userRole = res?.data?.role;

                if (userRole === "MAIN_ADMIN") {
                    setRedirectPath("/admin/dashboard-overview");
                } else if (userRole === "RENTAL_ADMIN") {
                    setRedirectPath("/services/RentalServices/branchAdmin/branchAdminDashboardView/branchAdminDashboardPage");
                } else if (userRole === "TENANT_ADMIN") {
                    setRedirectPath("/services/RentalServices/customerAdminAccount/customerAdminDashboardView/customerAdminMainDashboardPage");
                }

                // If request succeeds → user is logged in
                setHasToken(true);

            } catch (err) {

                // Invalid or no token → allow access
                setHasToken(false);

            } finally {
                setLoading(false);
            }
        };

        checkAuth();

    }, [location.pathname]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // If token exists → redirect based on role
    if (hasToken) {
        return <Navigate to={redirectPath || "/unauthorized"} replace />;
    }

    return children;
};

export default GuestRoute;