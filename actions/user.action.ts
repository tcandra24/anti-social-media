import { createClient } from "@/lib/supabase/client";

export const login = async (payload: { email: string; password: string }) => {
  try {
    const { auth } = createClient();
    const { data, error } = await auth.signInWithPassword({
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

export const register = async (payload: { name: string; email: string; password: string }) => {
  try {
    const { auth } = createClient();
    const { data, error } = await auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          name: payload.name,
        },
      },
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error: unknown) {
    return error;
  }
};

export const logout = async () => {
  try {
    const { auth } = createClient();
    const { error } = await auth.signOut();

    if (error) {
      throw error;
    }

    return true;
  } catch (error: unknown) {
    return error;
  }
};
