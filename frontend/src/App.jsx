import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// components
import ScrollToTop from "./components/main/scrollToTop";
import RouteLoader from "./pages/routeloader";

//layouts main page
import MainPublicLayout from "./layouts/main/mainPublicLayout/MainPageLayout";
import AdminLayout from "./layouts/main/adminLayout/AdminPageLayout";

//Protection Route admin
import ProtectedRouted from "./components/route/adminProtectedRoute";
import GuestRoute from "./components/route/publicProtectedRoute";

// admin main page
import Dashboardpage from "./pages/main/adminpage/dashboardpage"; 
import Projectspage from "./pages/main/adminpage/projectmanagementpage";
import Contentpage from "./pages/main/adminpage/contentmanagementpage";

//main page
import Homepage from "./pages/main/homepage";
import Aboutpage from "./pages/main/aboutpage";
import Servicepage from "./pages/main/servicepage";
import Projectpage from "./pages/main/projectpage";
import Newseventpage from "./pages/main/newseventpage";
import Contactpage from "./pages/main/contactpage";
import Messagepage from "./pages/main/adminpage/messagemanagementpage";
import Signuppage from "./pages/Authentication/signuppage";
import Signinpage from "./pages/Authentication/signinpage";
import Resetpasswordpage from "./pages/Authentication/renewpasswordpage";

// layouts rentalServices
import RentalServiceMainLayout from "./layouts/services/RentalServices/customerMainLayout/MainLayout";
import RentalServiceBranchAdminLayout from "./layouts/services/RentalServices/branchAdminLayout/branchAdminLayout";
import RentalServiceCustomerAdminAccountNavbarLayout from "./layouts/services/RentalServices/customerAdminAccountLayout/customerAdminAccountLayout";

// public pages / services/rentalservices
import RentalServiceHomepage from "./pages/services/RentalServices/home/homepage";
import RentalServiceLoginpage from "./pages/services/RentalServices/Authentication/loginPage";
import RentalServiceRegisterPage from "./pages/services/RentalServices/Authentication/registerPage";
import RentalServiceResetPassword from "./pages/services/RentalServices/Authentication/resetPasswordPage";

// admin pages / services/rentalservices
import RentalServiceBranchAdminDashboardPage from "./pages/services/RentalServices/branchAdmin/branchAdminDashboardView/branchAdminDashboardPage";
import RentalServiceBranchAdminDashboardTenantViewPage from "./pages/services/RentalServices/branchAdmin/branchAdminTenantView/BranchAdminTenantViewPage";
import RentalServiceBranchAdminRoomViewPage from "./pages/services/RentalServices/branchAdmin/branchAdminRoomView/branchAdminRoomViewPage";
import RentalServiceBranchAdminBillingViewPage from "./pages/services/RentalServices/branchAdmin/branchAdminBillingView/branchAdminBillingViewPage";
import RentalServiceBranchAdminNotificationViewPage from "./pages/services/RentalServices/branchAdmin/branchAdminNotificationView/BranchAdminNotificationPage";
import RentalServiceBranchAdminMessagePage from "./pages/services/RentalServices/branchAdmin/branchAdminMessagesView/branchAdminMessagePage";

// customer pages /services/rentalservices
import RentalServiceCustomerAdminMainDashboardPage from "./pages/services/RentalServices/customerAdminAccount/customerAdminDashboardView/customerAdminMainDashboardPage";
import RentalServiceCustomerAdminAccountProfilePage from "./pages/services/RentalServices/customerAdminAccount/customerAdminAccountProfileVIew/customerAdminAccountProfilePage";
import RentalServiceCustomerAdminAccountBillingPage from "./pages/services/RentalServices/customerAdminAccount/customerAdminAccountBillingView/customerAdminAccountBillingPage";
import RentalServiceCustomerAdminAccountChattingPage from "./pages/services/RentalServices/customerAdminAccount/customerAdminAccountChattingView/customerAdminAccountChattingPage";

function App() {

  return (
    <Router>
      <ScrollToTop/>
      <RouteLoader>
      <Routes>
        {/* All user purpose */}
         <Route path="/reset-password"
          element={
              <Resetpasswordpage/>
          }
        />
         <Route path="/signup"
          element={
            <GuestRoute>
              <Signuppage/>
            </GuestRoute>
          }
        />

        <Route path="/signin"
          element={
            <GuestRoute>
              <Signinpage/>
            </GuestRoute>
          }
        />
        {/* Main Public Page */}
        <Route path="/"
          element={
          <MainPublicLayout>
              <Homepage/>
          </MainPublicLayout>
          }
        />
          {/* Main About Page */}
        <Route path="/aboutus"
          element={
            <MainPublicLayout>
              <Aboutpage/>
            </MainPublicLayout>
          }
        />
          {/* Main Service Page */}
        <Route path="/services"
          element={
            <MainPublicLayout>
              <Servicepage/>
            </MainPublicLayout>
          }
        />
        <Route path="/projects"
          element={
            <MainPublicLayout>
              <Projectpage/>
            </MainPublicLayout>
          }
        />
         <Route path="/news&event"
          element={
            <MainPublicLayout>
              <Newseventpage/>
            </MainPublicLayout>
          }
        />
        <Route path="/contact"
          element={
            <MainPublicLayout>
              <Contactpage/>
            </MainPublicLayout>
          }
        />
        {/* Admin page */}
        <Route path="/admin/dashboard-overview"
          element={
            <ProtectedRouted allowedRoles={["MAIN_ADMIN"]}>
                <AdminLayout>
                <Dashboardpage/>
              </AdminLayout>
            </ProtectedRouted>
          }
        />
        <Route path="/admin/dashboard-project-management" 
          element={
            <ProtectedRouted allowedRoles={["MAIN_ADMIN"]}>
              <AdminLayout>
                <Projectspage/>
              </AdminLayout>
            </ProtectedRouted>
          }
        />
        <Route path="/admin/dashboard-content-management"
          element={
            <ProtectedRouted allowedRoles={["MAIN_ADMIN"]}>
              <AdminLayout>
                <Contentpage/>
              </AdminLayout>
            </ProtectedRouted>  
          } 
        />

        <Route path="/admin/dashboard-messages"
          element={
           <ProtectedRouted allowedRoles={["MAIN_ADMIN"]}> 
            <AdminLayout>
              <Messagepage/>
            </AdminLayout>
          </ProtectedRouted>  
          }
        />

        {/* PUBLIC services/rentalservices */}
        <Route
          path="/services/RentalServices"
          element={
            <RentalServiceMainLayout>
              <RentalServiceHomepage />
            </RentalServiceMainLayout>
          }
        />

        <Route
          path="/services/RentalServices/loginpage"
          element={
            <GuestRoute>
              <RentalServiceMainLayout>
                <RentalServiceLoginpage />
              </RentalServiceMainLayout>
            </GuestRoute>
          }
        />

        <Route
          path="/services/RentalServices/registerpage"
          element={
            <GuestRoute>
              <RentalServiceMainLayout>
                <RentalServiceRegisterPage />
              </RentalServiceMainLayout>
            </GuestRoute>
          }
        />

        <Route
          path="/services/RentalServices/reset-password"
          element={<RentalServiceResetPassword />}
        />

        {/* ADMINACCOUNT services/rentalservices */}
        <Route
          path="/services/RentalServices/branchAdmin/branchAdminDashboardView/branchAdminDashboardPage"
          element={
              <ProtectedRouted allowedRoles={["RENTAL_ADMIN"]}>
                <RentalServiceBranchAdminLayout>
                  <RentalServiceBranchAdminDashboardPage />
                </RentalServiceBranchAdminLayout>
              </ProtectedRouted>
          }
        />

        <Route
          path="/services/RentalServices/branchAdmin/branchAdminTenantView/BranchAdminTenantViewPage"
          element={
            <ProtectedRouted allowedRoles={["RENTAL_ADMIN"]}>
              <RentalServiceBranchAdminLayout>
                <RentalServiceBranchAdminDashboardTenantViewPage />
              </RentalServiceBranchAdminLayout>
            </ProtectedRouted>
          }
        />

        <Route
          path="/services/RentalServices/branchAdmin/branchAdminRoomView/branchAdminRoomViewPage"
          element={
            <ProtectedRouted allowedRoles={["RENTAL_ADMIN"]}>
              <RentalServiceBranchAdminLayout>
                <RentalServiceBranchAdminRoomViewPage />
              </RentalServiceBranchAdminLayout>
            </ProtectedRouted>
          }
        />

        <Route
          path="/services/RentalServices/branchAdmin/branchAdminMessagesView/branchAdminMessagePage"
          element={
            <ProtectedRouted allowedRoles={["RENTAL_ADMIN"]}>
              <RentalServiceBranchAdminLayout>
                <RentalServiceBranchAdminMessagePage />
              </RentalServiceBranchAdminLayout>
            </ProtectedRouted>
          }
        />

        <Route
          path="/services/RentalServices/branchAdmin/branchAdminBillingView/branchAdminBillingViewPage"
          element={
            <ProtectedRouted allowedRoles={["RENTAL_ADMIN"]}>
              <RentalServiceBranchAdminLayout>
                <RentalServiceBranchAdminBillingViewPage />
              </RentalServiceBranchAdminLayout>
            </ProtectedRouted>
          }
        />

        <Route
          path="/services/RentalServices/branchAdmin/branchAdminNotificationView/branchAdminNotificationPage"
          element={
            <ProtectedRouted allowedRoles={["RENTAL_ADMIN"]}>
              <RentalServiceBranchAdminLayout>
                <RentalServiceBranchAdminNotificationViewPage />
              </RentalServiceBranchAdminLayout>
            </ProtectedRouted>
          }
        />

        {/* CUSTOMERADMINACCOUNT services/rentalservices */}
        <Route
          path="/services/RentalServices/customerAdminAccount/customerAdminDashboardView/customerAdminMainDashboardPage"
          element={
            <ProtectedRouted allowedRoles={["TENANT_ADMIN"]}>
              <RentalServiceCustomerAdminAccountNavbarLayout>
                <RentalServiceCustomerAdminMainDashboardPage />
              </RentalServiceCustomerAdminAccountNavbarLayout>
            </ProtectedRouted>
          }
        />

        <Route
          path="/services/RentalServices/customerAdminAccount/customerAdminAccountProfileVIew/customerAdminAccountProfilePage"
          element={
            <ProtectedRouted allowedRoles={["TENANT_ADMIN"]}>
              <RentalServiceCustomerAdminAccountNavbarLayout>
                <RentalServiceCustomerAdminAccountProfilePage />
              </RentalServiceCustomerAdminAccountNavbarLayout>
            </ProtectedRouted>
          }
        />

        <Route
          path="/services/RentalServices/customerAdminAccount/customerAdminAccountBillingView/customerAdminAccountBillingPage"
          element={
           <ProtectedRouted allowedRoles={["TENANT_ADMIN"]}>
              <RentalServiceCustomerAdminAccountNavbarLayout>
                <RentalServiceCustomerAdminAccountBillingPage />
              </RentalServiceCustomerAdminAccountNavbarLayout>
            </ProtectedRouted>
          }
        />

        <Route
          path="/services/RentalServices/customerAdminAccount/customerAdminAccountChattingview/customerAdminAccountChattingPage"
          element={
            <ProtectedRouted allowedRoles={["TENANT_ADMIN"]}>
              <RentalServiceCustomerAdminAccountNavbarLayout>
                <RentalServiceCustomerAdminAccountChattingPage />
              </RentalServiceCustomerAdminAccountNavbarLayout>
            </ProtectedRouted>
          }
        />
      </Routes>
      </RouteLoader>
    </Router>
  );
}

export default App;