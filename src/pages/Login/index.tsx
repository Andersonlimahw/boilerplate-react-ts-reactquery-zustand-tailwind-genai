import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithGoogle, signInWithApple, signInWithLinkedIn, signInWithGitHub, signInCompanyWithEmail, signInCompanyWithSSO } from '../../services';

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleProviderLogin = async (loginFn: () => Promise<unknown>, provider: string) => {
        try {
            await loginFn();
            toast(`Welcome via ${provider}!`, { type: 'success' });
            navigate('/chat');
        } catch (ex) {
            toast(`Failed to login with ${provider}`, { type: 'error' });
        }
    };

    const handleCompanyLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInCompanyWithEmail(email, password);
            toast('Welcome!', { type: 'success' });
            navigate('/chat');
        } catch (ex) {
            toast('Failed to login', { type: 'error' });
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat bg-[url('assets/images/login-background.jpg')]">
            <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                <div className="text-white">
                    <div className="mb-8 flex flex-col items-center">
                        <img src="/assets/images/lemon-icon.png" width="150" alt="" />
                        <h1 className="py-4 text-2xl">
                            Boilerplate
                            <br />
                            <small>A amazing boilerplate using react, firebase, zustand and more!</small>
                        </h1>
                    </div>
                    <div className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <button onClick={() => handleProviderLogin(signInWithGoogle, 'Google')}>Login with Google</button>
                            <button onClick={() => handleProviderLogin(signInWithApple, 'Apple')}>Login with Apple</button>
                            <button onClick={() => handleProviderLogin(signInWithLinkedIn, 'LinkedIn')}>Login with LinkedIn</button>
                            <button onClick={() => handleProviderLogin(signInWithGitHub, 'GitHub')}>Login with GitHub</button>
                        </div>
                        <form className="flex flex-col space-y-2" onSubmit={handleCompanyLogin}>
                            <input type="email" placeholder="Company email" value={email} onChange={e => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                            <button type="submit">Company Login</button>
                        </form>
                        <div className="flex justify-center">
                            <button onClick={() => handleProviderLogin(signInCompanyWithSSO, 'SSO')}>Company SSO Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
