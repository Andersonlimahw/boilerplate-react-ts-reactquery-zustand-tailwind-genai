import React from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Login = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        toast("Welcome!.", { type: "success" });
        navigate('/chat');
    }
    return (
        <div
         className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat bg-[url('assets/images/login-background.jpg')]" >
            <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                <div className="text-white">
                    <div className="mb-8 flex flex-col items-center">
                        <img src="/assets/images/lemon-icon.png" width="150" alt="" />
                        <h1 className="py-4 text-2xl">
                            Boilerplate
                            <br />
                            <small>
                                A amazing boilerplate using react, firebase, zustand and more!
                            </small>
                        </h1>
                    </div>
                    <form action="#">
                        <div className="mt-4 flex justify-center text-lg text-white font-bold">
                            <button type="submit" onClick={handleLogin}> 
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}