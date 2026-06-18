"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn, type AuthActionResult } from "@/actions/auth";
import { Suspense } from "react";

const initialState: AuthActionResult = {};

function LoginFormContent() {
  const [state, formAction, isPending] = useActionState(signIn, initialState);
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "true";

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* ── Left Side: Hero + Stats ── */}
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
        {/* Main Headline Tile */}
        <section className="bg-[var(--color-eg-surface)] rounded-3xl p-8 md:p-12 shadow-[var(--shadow-eg-sm)] relative overflow-hidden flex-grow flex flex-col justify-center min-h-[360px] transition-all duration-300 hover:shadow-[var(--shadow-eg-md)]">
          {/* Decorative overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-gradient-to-br from-[var(--color-eg-accent)] to-transparent" />
          <div className="z-10 relative">
            <h1 className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--color-eg-text-primary)] mb-6">
              Find Every Government Scheme You Qualify For
            </h1>
            <p className="text-lg leading-[1.6] text-[var(--color-eg-text-secondary)] max-w-xl">
              Our AI engine analyzes thousands of federal and state programs to
              find the exact support you&apos;re entitled to in seconds.
            </p>
          </div>
        </section>

        {/* Metrics Row */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 7V4H20V7M9 20H15M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              label: "5,000+ Schemes Indexed",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              label: "100% Verified Sources",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              label: "2.4M Success Stories",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[var(--color-eg-surface)] rounded-3xl p-6 shadow-[var(--shadow-eg-sm)] flex flex-col items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-eg-hover)]"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-eg-accent)] flex items-center justify-center text-[var(--color-eg-text-primary)]">
                {stat.icon}
              </div>
              <span className="text-sm font-semibold tracking-[0.01em] text-[var(--color-eg-text-primary)]">
                {stat.label}
              </span>
            </div>
          ))}
        </section>

        {/* Trust Bar */}
        <section className="bg-[var(--color-eg-surface)] rounded-3xl p-4 shadow-[var(--shadow-eg-sm)] flex items-center justify-center">
          <div className="text-xs font-medium text-[var(--color-eg-text-muted)] flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Secure, encrypted federal compliance.
          </div>
        </section>
      </div>

      {/* ── Right Side: Login Form ── */}
      <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-full">
        <section className="bg-[var(--color-eg-surface)] rounded-3xl shadow-[var(--shadow-eg-sm)] p-8 sm:p-10 flex-grow flex flex-col justify-center h-full transition-all duration-300 hover:shadow-[var(--shadow-eg-md)] w-full">
          <h2 className="text-[32px] font-semibold leading-[1.2] tracking-[-0.01em] text-[var(--color-eg-text-primary)] mb-2">
            Welcome Back
          </h2>
          <p className="text-base leading-[1.6] text-[var(--color-eg-text-secondary)] mb-8">
            Enter your details to access your dashboard.
          </p>

          {/* Success message after registration */}
          {justRegistered && (
            <div
              id="register-success"
              className="mb-6 p-4 rounded-xl bg-[var(--color-eg-success-light)] text-[var(--color-eg-success-dark)] text-sm font-medium"
            >
              Account created successfully! Please sign in.
            </div>
          )}

          {/* Error */}
          {state.error && (
            <div
              id="login-error"
              className="mb-6 p-4 rounded-xl bg-[var(--color-eg-error-light)] text-[var(--color-eg-error)] text-sm font-medium"
            >
              {state.error}
            </div>
          )}

          {/* Form */}
          <form action={formAction} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-semibold leading-[1.4] tracking-[0.01em] text-[var(--color-eg-text-secondary)] mb-2"
              >
                Email Address
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className="w-full h-14 px-4 rounded-xl border border-[var(--color-eg-border)] bg-[var(--color-eg-surface)] text-base text-[var(--color-eg-text-primary)] placeholder:text-[var(--color-eg-text-disabled)] focus:outline-none focus:border-[var(--color-eg-border-focus)] focus:border-2 transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-semibold leading-[1.4] tracking-[0.01em] text-[var(--color-eg-text-secondary)]"
                >
                  Password
                </label>
                <span className="text-xs font-medium text-[var(--color-eg-text-muted)] cursor-default">
                  Forgot password?
                </span>
              </div>
              <input
                id="login-password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full h-14 px-4 rounded-xl border border-[var(--color-eg-border)] bg-[var(--color-eg-surface)] text-base text-[var(--color-eg-text-primary)] placeholder:text-[var(--color-eg-text-disabled)] focus:outline-none focus:border-[var(--color-eg-border-focus)] focus:border-2 transition-all duration-300"
              />
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={isPending}
              className="w-full h-14 bg-[var(--color-eg-text-primary)] text-[var(--color-eg-text-inverse)] text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing in..." : "Continue"}
              {!isPending && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33337 8H12.6667M12.6667 8L8.00004 3.33337M12.6667 8L8.00004 12.6667"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-8 text-center text-base text-[var(--color-eg-text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[var(--color-eg-text-primary)] font-bold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginFormContent />
    </Suspense>
  );
}
