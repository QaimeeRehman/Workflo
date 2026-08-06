"use client";

import Logo from "../_components/Logo";

export default function Error({ error, reset }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="absolute top-10 left-10">
        <Logo />
      </div>
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        {/* Error Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-background">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-primary-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-800">
          Wrong Credentials!
        </h1>

        <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          wrong email and password
        </p>

        <button
          onClick={reset}
          className="mt-8 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700 active:scale-95"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
