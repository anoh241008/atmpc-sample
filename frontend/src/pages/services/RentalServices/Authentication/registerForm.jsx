import React, { useState } from "react";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import InlineAlert from "../../../../components/alert/inlineAlert";
import AdminManagement from "../../../../hooks/authentication/AdminManagement";
import Turnstile from "react-turnstile";

const RegisterForm = () => {
  const {
    captchatoken,
    setCaptchatoken,
    captchakey,
    setCaptchaKey,
    alert,
    error,
    loading,
    handleRegisterChange,
    handleRegistrationSubmit,
    registerForm,
    turnstileRef,
  } = AdminManagement();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">

      {/* HEADER */}
      <div className="text-center mb-10 max-w-lg">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
          Create your account
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Connect with trusted landlords — just like many renters already have.
        </p>
        <p className="text-xs text-gray-400 mt-3">
          Already have an account? Use the Login / Register button to switch.
        </p>
      </div>

      {/* CARD */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />

        <form onSubmit={handleRegistrationSubmit} className="px-8 py-8 space-y-4">
          <InlineAlert
            type={alert?.type}
            message={alert?.message}
          />

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={registerForm.email}
              onChange={handleRegisterChange}
              className={`w-full bg-white px-4 py-2.5 border rounded-lg text-sm text-gray-900
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors
                ${error.email ? "border-red-400" : "border-gray-300"}`}
            />
            {error.email && (
              <p className="text-red-500 text-xs mt-1.5">{error.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create a password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                className={`w-full bg-white px-4 py-2.5 pr-10 border rounded-lg text-sm text-gray-900
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors
                  ${error.password ? "border-red-400" : "border-gray-300"}`}
              />
              {registerForm.password && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={togglePassword}
                >
                  {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              )}
            </div>
            {error.password && (
              <p className="text-red-500 text-xs mt-1.5">{error.password}</p>
            )}
          </div>

          {/* BRANCH */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Branch
            </label>
            <select
              name="branch"
              id="branch"
              className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm text-gray-900
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors
                ${error.branch ? "border-red-400" : "border-gray-300"}`}
              value={registerForm.branch}
              onChange={handleRegisterChange}
            >
              <option value="" hidden>Select your branch</option>
              <option value="CDO_Branch">CDO_Branch</option>
              <option value="BANGON-MARAWI_Branch">BANGON-MARAWI_Branch</option>
              <option value="MSU-MARAWI_Branch">MSU-MARAWI_Branch</option>
            </select>
            {error.branch && (
              <p className="text-red-500 text-xs mt-1.5">{error.branch}</p>
            )}
          </div>

          {/* TURNSTILE */}
          <div className="flex justify-center">
            <Turnstile
              key={captchakey}
              ref={turnstileRef}
              sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
              options={{ appearance: "always" }}
              onVerify={(token) => { setCaptchatoken(token); }}
              onExpire={() => { setCaptchatoken(""); }}
              onError={() => { setCaptchatoken(""); }}
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400
              disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg
              transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Signing up…
              </>
            ) : (
              "Sign up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;