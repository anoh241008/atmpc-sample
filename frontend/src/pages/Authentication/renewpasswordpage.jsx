import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, replace } from "react-router-dom";
import InlineAlert from "../../components/alert/inlineAlert";
import PasswordResetManagement from "../../hooks/authentication/passwordreset";
import { validateResetPasswordToken } from "../../api/Authentication/passwordreset";
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

export default function Resetpasswordpage() {



  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const {

  handleResetPasswordChange,
  handleResetpassword,
  errorPassword,
  loadingPassword,
  alertPassword,
  resetFormData,


  } = PasswordResetManagement (token);
  
      useEffect(() => {
          if (!token) {
                navigate(
                "/unauthorized",
                { replace: true }
            );
          }
  
          const validate = async () => {
              try {
                  await validateResetPasswordToken(token);
              } catch (err) {
                     navigate(
                "/unauthorized",
                { replace: true }
            );
              }
          };
  
          validate();
  
      }, [token]);
  

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md px-10 py-10">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-yellow-400 rounded-2xl p-3.5 mb-4 shadow-lg shadow-yellow-200">
             <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-yellow-900"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 10V7a4 4 0 10-8 0v3M7 10h10a1 1 0 011 1v8a1 1 0 01-1 1H7a1 1 0 01-1-1v-8a1 1 0 011-1z"
                        />
                    </svg>
          </div>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-widest mb-2">
            Admin Portal
          </span>
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Reset Password</h1>
          <p className="text-sm text-gray-400 mt-1 italic">Choose a strong new password</p>
        </div>

        <form onSubmit={handleResetpassword}>
          <InlineAlert 
          type={alertPassword?.type}
           message={alertPassword?.message} 
           />

          <div className="flex flex-col gap-5">

            {/* New Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                New Password
              </label>
              <div className="relative">
                <span className="absolute top-3 left-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showNew ? "text" : "password"}
                  name="newpassword"
                  value={resetFormData.newpassword}
                  onChange={handleResetPasswordChange}
                  placeholder="Enter new password"

                  className="w-full pl-10 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-100 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition"
                  aria-label="Toggle new password visibility"
                >
                  <EyeIcon open={showNew} />
                </button>
                
              </div>
                 {errorPassword.newpassword && <p className="text-red-500 text-sm mt-1">{errorPassword.newpassword}</p>}
                    {errorPassword.general && errorPassword.general === "Password and confirm password do not match" && (
                    <p className="text-red-500 text-sm mt-1">{errorPassword.general}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute top-3 left-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmnewpassword"
                  value={resetFormData.confirmnewpassword}
                  onChange={handleResetPasswordChange}
                  placeholder="Re-enter new password"
  
                  className="w-full pl-10 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-100 transition"/>


                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition"
                  aria-label="Toggle confirm password visibility"
                >
                  <EyeIcon open={showConfirm} />
                </button>
               
              </div>
               {errorPassword.confirmnewpassword && <p className="text-red-500 text-sm mt-1">{errorPassword.confirmnewpassword}</p>}
                 {errorPassword.general && errorPassword.general === "Password and confirm password do not match" && (
                    <p className="text-red-500 text-sm mt-1">{errorPassword.general}</p>
                )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-yellow-900 font-extrabold text-base rounded-xl shadow-md shadow-yellow-200 transition-all duration-150 tracking-wide mt-1 flex items-center justify-center gap-2"
            >
               {loadingPassword ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Changing ...
              </>
            ) : (
              <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
                Reset Password
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
              Remember your password?{" "}
              <a href="/signin" className="text-yellow-600 font-semibold hover:underline">
                Sign in
              </a>
            </p>

          </div>
        </form>
      </div>
    </div>
  );
}

