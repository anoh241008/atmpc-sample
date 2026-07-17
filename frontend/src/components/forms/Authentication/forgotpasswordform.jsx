import React, {useState} from 'react';
import InlineAlert from '../../alert/inlineAlert';


export default function ForgotPasswordForm({
    formDataPassword = { email: ""},
    mode = "forgot password",
    handleChange = () => {},
    handleSubmit = () => {},
    errorPassword = {},
    loadingPassword = false,
    alertPassword,

}) {



    return(

        <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-start justify-center py-2 px-2 gap-2">
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
                <h1 className="text-black font-extrabold text-lg tracking-wide italic">Forgot Password?</h1>
                <p className="text-gray-700 text-sm font-tight ">Enter your registered email and we'll send you a secure reset link.</p>
                 <div className="w-full">
                                          <InlineAlert

                    type={alertPassword?.type}
                    message={alertPassword?.message}

                />
                    
                </div>   
              
                <div className="mt-4 w-full relative">

                    <label className="text-xs text-gray-500 tracking-wide">EMAIL ADDRESS</label>
                        <span className="absolute top-9 left-3 text-gray-400">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              </span>
                    <input
                        name="email"
                        value={formDataPassword.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        className="w-full bg-white mt-0.5 border border-gray-300 rounded-md px-2 py-1 text-sm text-black py-2 pl-8  focus:outline-none focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-100 transition"
                    />
                    {errorPassword.email && <p className="text-red-500 text-sm mt-1">{errorPassword.email}</p>}
                      {errorPassword.general && errorPassword.general === "Invalid email" && (
                    <p className="text-red-500 text-sm mt-1">{errorPassword.general}</p>
                )}
                </div>
                
                <button
                    type="submit"
                    disabled={loadingPassword}

                    className="px-3 border border-gray-400 w-full text-black py-1 text-xs rounded-md transition italic py-2 mt-3 hover:bg-gray-100 cursor-pointer transition"
                >
                  {loadingPassword ? "Sending..." : "Send reset link"}
                </button>

            </div>

        </form>
        
    )
}