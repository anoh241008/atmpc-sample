import { useState } from "react";
import AuthenticationManagement from "../../hooks/authentication/authenticationManagement";
import PasswordResetManagement from "../../hooks/authentication/passwordreset";
import InlineAlert from "../../components/alert/inlineAlert";
import Turnstile from "react-turnstile";
import ForgotPasswordModal from "../../features/Authentication/forgotpasswordmodal";
import ForgotPasswordForm from "../../components/forms/Authentication/forgotpasswordform";
const EyeIcon = ({ open }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    {open ? (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </>
    ) : (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M6.633 6.633A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.97 9.97 0 01-4.175 5.192M6.633 6.633L3 3m3.633 3.633l10.734 10.734M17.367 17.367L21 21" />
      </>
    )}
  </svg>
);

export default function Signinpage() {
 
  const {

    handleLogginChange,
    handleLoggingIn,
    captchatoken,
    setCaptchatoken,
    captchakey,
    setCaptchakey,
    error,
    loading,
    alert,
    logginForm,
    turnstileRef,

  } = AuthenticationManagement ();



  const {

    handleSendLinkChange,
    handleSendLink,
    formDataPassword,
    errorPassword,
    loadingPassword,
    alertPassword,
  } = PasswordResetManagement();

  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState({
    open: false,
    mode:"forgot password",
    data: null,
  });

  const handleClose = () => {

    setOpenModal({
      open: false, 
      mode: "forgot password",
      data: null,

     });



  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md px-10 py-10">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-yellow-400 rounded-2xl p-3.5 mb-4 shadow-lg shadow-yellow-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-widest mb-2">
            Admin Portal
          </span>
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Admin Sign In</h1>
          <p className="text-sm text-gray-400 mt-1 italic">Authorized personnel only</p>
        </div>
      <form onSubmit={handleLoggingIn} autoComplete="off">
            <InlineAlert
                type={alert?.type}
                message={alert?.message}
                />
        <div className="flex flex-col gap-5">

          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email</label>
            <div className="relative">
              <span className="absolute top-3 left-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                type="text"
                name="email"
                value={logginForm.email}
                onChange={handleLogginChange}
                placeholder="admin_@gmail.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-100 transition"
              />
               {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
               {error.general && error.general === "Invalid email" && (
                    <p className="text-red-500 text-sm mt-1">{error.general}</p>
                )}
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
              <a onClick={() => setOpenModal({open: true, mode: "forgot password", data: null})} className="text-xs text-yellow-600 font-semibold hover:underline cursor-pointer">Forgot password?</a>
            </div>
            <div className="relative">
              <span className="absolute top-3 left-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={logginForm.password}
                onChange={handleLogginChange}
                placeholder="Enter password"
                className="w-full pl-10 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-100 transition"
              />
              {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
              {error.general && error.general === "Invalid password" && (
                  <p className="text-red-500 text-sm mt-1">{error.general}</p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition"
                aria-label="Toggle password visibility"
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
          </div>
             <Turnstile
                                                            key={captchakey}
                                                            ref={turnstileRef}
                                                            sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    
                                                            options={{
                                                                    appearance: "always",
                                                                }}
                    
                                                            onVerify={(token) => {
            
                                                                setCaptchatoken(token);
                                                            }}
                    
                                                            onExpire={() => { setCaptchatoken(""); }}
                    
                                                            onError={() => {
          
                                                                setCaptchatoken("");
                                                            }}
                                                        />
          
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer py-3.5 bg-yellow-400 hover:bg-yellow-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-yellow-900 font-extrabold text-base rounded-xl shadow-md shadow-yellow-200 transition-all duration-150 tracking-wide mt-1 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Signing in...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="/signup" className="text-yellow-600 font-semibold hover:underline">
              Register here
            </a>
          </p>

        </div>
      </form>
      </div>
    <ForgotPasswordModal
        isOpen = {openModal.open}
        onClose = {handleClose}
      >
        {openModal.open && (

          <ForgotPasswordForm
            key={openModal.open}
            mode={openModal.mode}
            formDataPassword={formDataPassword}
            handleChange={handleSendLinkChange}
            handleSubmit={ handleSendLink}
            errorPassword={errorPassword}
            loadingPassword = {loadingPassword}
            alertPassword = {alertPassword}
          />
        )}
      
    </ForgotPasswordModal>
    </div>

  );
}