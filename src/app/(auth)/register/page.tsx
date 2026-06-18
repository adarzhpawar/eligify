"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signUp, type AuthActionResult } from "@/actions/auth";

const initialState: AuthActionResult = {};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(signUp, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full max-w-[480px]">
      <section className="bg-[var(--color-eg-surface)] rounded-3xl p-8 sm:p-10 shadow-[var(--shadow-eg-sm)]">
        {/* Header */}
        <h1 className="text-[32px] font-semibold leading-[1.2] tracking-[-0.01em] text-[var(--color-eg-text-primary)] mb-2">
          Create Account
        </h1>
        <p className="text-base leading-[1.6] text-[var(--color-eg-text-secondary)] mb-8">
          Join Eligify to discover government schemes tailored for you.
        </p>

        {/* Error */}
        {state.error && (
          <div
            id="register-error"
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
              htmlFor="register-email"
              className="block text-sm font-semibold leading-[1.4] tracking-[0.01em] text-[var(--color-eg-text-secondary)] mb-2"
            >
              Email Address
            </label>
            <input
              id="register-email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              className="w-full h-14 px-4 rounded-xl border border-[var(--color-eg-border)] bg-[var(--color-eg-surface)] text-base text-[var(--color-eg-text-primary)] placeholder:text-[var(--color-eg-text-disabled)] focus:outline-none focus:border-[var(--color-eg-border-focus)] focus:border-2 transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="register-password"
              className="block text-sm font-semibold leading-[1.4] tracking-[0.01em] text-[var(--color-eg-text-secondary)] mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="register-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full h-14 px-4 pr-12 rounded-xl border border-[var(--color-eg-border)] bg-[var(--color-eg-surface)] text-base text-[var(--color-eg-text-primary)] placeholder:text-[var(--color-eg-text-disabled)] focus:outline-none focus:border-[var(--color-eg-border-focus)] focus:border-2 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-eg-text-muted)] hover:text-[var(--color-eg-text-primary)] transition-colors"
                tabIndex={-1}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="register-confirm-password"
              className="block text-sm font-semibold leading-[1.4] tracking-[0.01em] text-[var(--color-eg-text-secondary)] mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="register-confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full h-14 px-4 pr-12 rounded-xl border border-[var(--color-eg-border)] bg-[var(--color-eg-surface)] text-base text-[var(--color-eg-text-primary)] placeholder:text-[var(--color-eg-text-disabled)] focus:outline-none focus:border-[var(--color-eg-border-focus)] focus:border-2 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-eg-text-muted)] hover:text-[var(--color-eg-text-primary)] transition-colors"
                tabIndex={-1}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showConfirmPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            id="register-submit"
            type="submit"
            disabled={isPending}
            className="w-full h-14 bg-[var(--color-eg-text-primary)] text-[var(--color-eg-text-inverse)] text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Creating account..." : "Create Account"}
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

        {/* Link to login */}
        <p className="mt-8 text-center text-base text-[var(--color-eg-text-secondary)]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[var(--color-eg-text-primary)] font-bold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </section>
    </div>
  );
}
