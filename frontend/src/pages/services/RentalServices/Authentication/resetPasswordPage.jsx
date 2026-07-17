import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InlineAlert from "../../../../components/alert/inlineAlert";
import PasswordResetManagement from "../../../../hooks/authentication/passwordreset";
import { validateResetPasswordToken } from "../../../../api/Authentication/passwordreset";
import axios from "axios";

const RentalServiceResetPassword = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
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
  } = PasswordResetManagement(token);

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header stripe */}
          <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />

          <div className="px-8 py-10">
            {/* Heading */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Set new password
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Choose a strong password you haven't used before.
              </p>
            </div>

            {/* Alert */}
            <InlineAlert
              type={alertPassword?.type}
              message={alertPassword?.message}
            />

            <form onSubmit={handleResetpassword} className="space-y-5 mt-5">
              {/* NEW PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  New password
                </label>
                <div className="relative">
                  <input
                    name="newpassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={resetFormData.newpassword}
                    onChange={handleResetPasswordChange}
                    className={`w-full border px-4 py-2.5 pr-10 rounded-lg bg-white text-gray-900 placeholder-gray-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errorPassword.newpassword
                        ? "border-red-400"
                        : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={15} />
                    ) : (
                      <FaEye size={15} />
                    )}
                  </button>
                </div>
                {errorPassword.newpassword && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errorPassword.newpassword}
                  </p>
                )}
                {errorPassword.general &&
                  errorPassword.general ===
                    "Password and confirm password do not match" && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errorPassword.general}
                    </p>
                  )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    name="confirmnewpassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter new password"
                    value={resetFormData.confirmnewpassword}
                    onChange={handleResetPasswordChange}
                    className={`w-full border px-4 py-2.5 pr-10 rounded-lg bg-white text-gray-900 placeholder-gray-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errorPassword.confirmnewpassword
                        ? "border-red-400"
                        : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? (
                      <FaEyeSlash size={15} />
                    ) : (
                      <FaEye size={15} />
                    )}
                  </button>
                </div>
                {errorPassword.confirmnewpassword && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errorPassword.confirmnewpassword}
                  </p>
                )}
                {errorPassword.general &&
                  errorPassword.general ===
                    "Password and confirm password do not match" && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errorPassword.general}
                    </p>
                  )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loadingPassword}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg text-sm transition-colors mt-2 flex items-center justify-center gap-2"
              >
                {loadingPassword ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Updating password…
                  </>
                ) : (
                  "Reset password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalServiceResetPassword;