"use server";

import { createClient } from "@/lib/supabase/client";

export const login = async (payload: { email: string; password: string }) => {
  try {
    const { auth } = createClient();
    const { data, error } = await auth.signUp({
      email: payload.email,
      password: payload.password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error: unknown) {
    return error;
  }
};

export const register = (payload: { name: string; email: string; password: string }) => {};
