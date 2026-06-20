"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  age: z.coerce.number().min(0, "Age cannot be negative"),
  state: z.string().min(1, "State is required"),
  preferredLanguage: z.string().optional(),
  gender: z.string().optional(),
  occupation: z.string().min(1, "Occupation is required"),
  employmentStatus: z.string().optional(),
  annualIncome: z.string().optional(),
});

export type ProfileActionResult = {
  error?: string;
  success?: boolean;
};

export async function completeProfile(
  prevState: ProfileActionResult,
  formData: FormData
): Promise<ProfileActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to complete your profile." };
  }

  // Extract fields
  const rawData = {
    fullName: formData.get("fullName")?.toString(),
    age: formData.get("age"),
    state: formData.get("state")?.toString(),
    preferredLanguage: formData.get("language")?.toString(),
    gender: formData.get("gender")?.toString(),
    occupation: formData.get("occupation")?.toString(),
    employmentStatus: formData.get("status")?.toString(),
    annualIncome: formData.get("salary")?.toString(),
  };

  const parsed = profileSchema.safeParse(rawData);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const data = parsed.data;

  try {
    // Check if profile exists
    const existing = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, user.id));

    if (existing.length > 0) {
      await db
        .update(profiles)
        .set({
          ...data,
          profileCompleted: true,
          updatedAt: new Date(),
        })
        .where(eq(profiles.userId, user.id));
    } else {
      await db.insert(profiles).values({
        userId: user.id,
        ...data,
        profileCompleted: true,
      });
    }
  } catch (error: unknown) {
    return { error: "Failed to save profile. " + (error as Error).message };
  }

  revalidatePath("/");
  redirect("/dashboard");
}

export async function updateProfile(
  prevState: ProfileActionResult,
  formData: FormData
): Promise<ProfileActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update your profile." };
  }

  // Extract fields
  const rawData = {
    fullName: formData.get("fullName")?.toString(),
    age: formData.get("age"),
    state: formData.get("state")?.toString(),
    preferredLanguage: formData.get("language")?.toString(),
    gender: formData.get("gender")?.toString(),
    occupation: formData.get("occupation")?.toString(),
    employmentStatus: formData.get("status")?.toString(),
    annualIncome: formData.get("salary")?.toString(),
  };

  const parsed = profileSchema.safeParse(rawData);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const data = parsed.data;

  try {
    const existing = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, user.id));

    if (existing.length > 0) {
      await db
        .update(profiles)
        .set({
          ...data,
          profileCompleted: true,
          updatedAt: new Date(),
        })
        .where(eq(profiles.userId, user.id));
    } else {
      await db.insert(profiles).values({
        userId: user.id,
        ...data,
        profileCompleted: true,
      });
    }
  } catch (error: unknown) {
    return { error: "Failed to update profile. " + (error as Error).message };
  }

  revalidatePath("/profile");
  return { success: true };
}
