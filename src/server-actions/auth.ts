"use server";

import { getSupabaseServerClient } from "@/supabase/server-client";
import { auditRepository } from "@/repositories/audit";
import { ActionResult, success, failure, handleServerError } from "./utils";

export async function signIn(
  email: string,
  password: string
): Promise<ActionResult> {
  try {
    const client = await getSupabaseServerClient();

    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      await auditRepository.logAuth({
        email,
        action: "failed_login",
      });

      return failure("Invalid email or password");
    }

    await auditRepository.logAuth({
      email,
      action: "login",
    });

    return success({ user: data.user });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<ActionResult> {
  try {
    const client = await getSupabaseServerClient();

    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      return failure(error.message);
    }

    return success({ user: data.user });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function signOut(): Promise<ActionResult> {
  try {
    const client = await getSupabaseServerClient();
    const {
      data: { user },
    } = await client.auth.getUser();

    if (user?.email) {
      await auditRepository.logAuth({
        email: user.email,
        action: "logout",
      });
    }

    await client.auth.signOut();
    return success();
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getSession() {
  try {
    const client = await getSupabaseServerClient();
    const {
      data: { session },
    } = await client.auth.getSession();
    return session;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const client = await getSupabaseServerClient();
    const {
      data: { user },
    } = await client.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

export async function resetPassword(email: string): Promise<ActionResult> {
  try {
    const client = await getSupabaseServerClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/admin/reset-password`,
    });

    if (error) {
      return failure(error.message);
    }

    return success();
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updatePassword(password: string): Promise<ActionResult> {
  try {
    const client = await getSupabaseServerClient();
    const { error } = await client.auth.updateUser({ password });

    if (error) {
      return failure(error.message);
    }

    return success();
  } catch (error) {
    return handleServerError(error);
  }
}
