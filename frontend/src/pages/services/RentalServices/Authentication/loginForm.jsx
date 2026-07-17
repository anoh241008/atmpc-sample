import React, { useState } from 'react';
import { FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InlineAlert from '../../../../components/alert/inlineAlert';
import PasswordResetManagement from '../../../../hooks/authentication/passwordreset';
import AuthenticationManagement from '../../../../hooks/authentication/authenticationManagement';
import Turnstile from 'react-turnstile';
const LoginForm = () => {
  const {
    handleSendLinkChange,
    handleSendLink,
    errorPassword,
    loadingPassword,
    formDataPassword,
    alertPassword,
  } = PasswordResetManagement();

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

  } = AuthenticationManagement();

  const API_URL = import.meta.env.VITE_API_URL;
  const [openModal, setOpenModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [message, setMessage] = useState('');


  const clickToOpen = () => {
    setOpenModal(true);
    setForgotEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">

      {/* HEADER */}
      <div className="text-center mb-10 max-w-lg">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
          Login to Your Account
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          View your rental status, track payments, manage billing, submit maintenance requests,
          and communicate with your landlord.
        </p>
        <p className="text-xs text-gray-400 mt-3">
          Forgot your password? Use the link below the form to reset it.
        </p>
      </div>

      {/* LOGIN CARD */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />

        <form onSubmit={handleLoggingIn} className="px-8 py-8 space-y-4">
          {/* EMAIL */}
             <InlineAlert
                          type={alert?.type}
                          message={alert?.message}
                          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={logginForm.email}
              onChange={handleLogginChange}
              className={`w-full bg-white px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors
                ${error.email ? "border-red-400" : "border-gray-300"}`}
            />
             {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
               {error.general && error.general === "Invalid email" && (
                    <p className="text-red-500 text-sm mt-1">{error.general}</p>
                )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={logginForm.password}
                onChange={handleLogginChange}
                className={`w-full bg-white px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors
                  ${error.password ? "border-red-400" : "border-gray-300"}`}
              />
            {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
              {error.general && error.general === "Invalid password" && (
                  <p className="text-red-500 text-sm mt-1">{error.general}</p>
              )}
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
          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full text-white py-2.5 px-4 rounded-lg
              bg-green-600 hover:bg-green-700 transition-colors duration-200 font-semibold text-sm mt-2"
          >
             {loading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Logging in...
              </>
            ) : (
              "Login in"
            )}
    
          </button>

          {/* LINKS */}
          <div className="flex justify-center gap-6 pt-4 border-t border-gray-100">
            <p
              onClick={clickToOpen}
              className="text-green-700 text-xs cursor-pointer hover:text-green-900 hover:underline transition-colors"
            >
              Forgot password?
            </p>
            <Link
              to="/services/RentalServices/registerPage"
              className="text-green-700 text-xs cursor-pointer hover:text-green-900 hover:underline transition-colors"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>

      {/* ================= FORGOT PASSWORD MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />

            <div className="px-8 py-8 relative">
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors text-lg leading-none"
              >
                ✕
              </button>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Forgot password?
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Enter your email and we'll send you a reset link.
                </p>
              </div>

              {/* FORGOT PASSWORD FORM */}
              <form onSubmit={handleSendLink} className="space-y-4">
                <InlineAlert
                  type={alertPassword?.type}
                  message={alertPassword?.message}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formDataPassword.email}
                    onChange={handleSendLinkChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm text-gray-900
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  />
                  {errorPassword.email && (
                    <p className="text-red-500 text-xs mt-1.5">{errorPassword.email}</p>
                  )}
                  {errorPassword.general && errorPassword.general === 'Invalid email' && (
                    <p className="text-red-500 text-xs mt-1.5">{errorPassword.general}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loadingPassword}
                  className="w-full py-2.5 text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400
                    disabled:cursor-not-allowed transition-colors rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                >
                  {loadingPassword ? (
                    <>
                      <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    'Send reset link'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* ========================================================= */}
    </div>
  );
};

export default LoginForm;