'use client';
import { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoSvg from '../../../public/logo.svg';
import backgroundSticker1 from '../../../public/bg-sticker-1.png';
import backgroundSticker2 from '../../../public/bg-sticker-2.png';


export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const resetEmail = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent! Please check your inbox.');
                router.push('/signin');
            })
            .catch((error) => {
                console.error('Password reset error:', error);
                alert('Password reset error. Please try again.');
            });
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 overflow-hidden">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="relative flex items-center justify-center w-full h-full">
                        <div className="bgsticker-1 absolute z-[-1] bg-no-repeat bg-cover">
                            <Image src={backgroundSticker1} alt="Background Sticker" layout="fill" objectFit="cover" />
                        </div>
                        <div className="bgsticker-2 absolute z-[-2] bg-no-repeat bg-cover">
                            <Image src={backgroundSticker2} alt="Background Sticker" layout="fill" objectFit="cover" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 mb-4">
                        <Image src={logoSvg} alt="Logo" width={60} height={40} layout="fixed" />
                        <h2 className="text-center text-white text-3xl font-bold">GiphyGIFer</h2>
                    </div>

                    <h2 className="mt-10 text-center text-2xl font-extrabold leading-9">
                        <span style={{ background: `linear-gradient(to right, rgb(108, 78, 229), rgb(10, 197, 223))`, WebkitBackgroundClip: 'text', color: 'transparent' }}>
                            Forgot Your Password?
                        </span>
                    </h2>

                    <h2 className="mt-1 text-center text-base text-white">
                        Reset Your GiphyGIFer Password
                    </h2>
                </div>

                <hr className="w-4/5 lg:w-3/12" />

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} required className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button onClick={() => resetEmail()} disabled={!email} className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                Send Forgot Password Email
                            </button>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-400">
                        Remembered your password?{' '}
                        <button onClick={() => router.push('/signin')} className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </>
    )
}