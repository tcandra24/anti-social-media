import { createClient } from "@/lib/supabase/client";

export const getUser = async () => {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase.from("users").select().eq("email", user?.email).limit(1).single();

    return {
      name: data.name,
      email: data.email,
      avatar_url: data.avatar_url,
    };
  } catch (error: any) {
    return error;
  }
};

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
  } catch (error: any) {
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
  } catch (error: any) {
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
  } catch (error: any) {
    return error;
  }
};
