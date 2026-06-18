"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type AuthActionResult = {
  error?: string;
  success?: boolean;
};

export async function signUp(
  _prevState: AuthActionResult,
  formData: FormData
): Promise<AuthActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validation
  if (!email || !password || !confirmPassword) {
    return { error: "All fields are required." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const supabase = await createClient();

  console.log("[signUp] Attempting signup for:", email);

  const { data: signUpData, error } = await supabase.auth.signUp({
    email,
    password,
  });

  console.log("[signUp] signUp response data:", JSON.stringify(signUpData, null, 2));
  console.log("[signUp] signUp response error:", JSON.stringify(error, null, 2));

  if (error) {
    return { error: error.message };
  }

  // Automatically sign in the newly created and auto-confirmed user
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("[signUp] signIn response data:", JSON.stringify(signInData, null, 2));
  console.log("[signUp] signIn response error:", JSON.stringify(signInError, null, 2));

  if (signInError) {
    return { error: signInError.message };
  }

  redirect("/onboarding");
}

export async function signIn(
  _prevState: AuthActionResult,
  formData: FormData
): Promise<AuthActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
