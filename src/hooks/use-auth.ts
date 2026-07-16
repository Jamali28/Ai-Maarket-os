"use client";

import { useState, useEffect, useCallback } from "react";
import type { User, Subscription } from "@/types";

interface AuthState {
  user: User | null;
  subscription: Subscription | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    subscription: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setState({
          user: data.user,
          subscription: data.subscription,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setState({ user: null, subscription: null, isLoading: false, isAuthenticated: false });
      }
    } catch {
      setState({ user: null, subscription: null, isLoading: false, isAuthenticated: false });
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const signOut = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setState({ user: null, subscription: null, isLoading: false, isAuthenticated: false });
    window.location.href = "/";
  }, []);

  return { ...state, refetch: fetchUser, signOut };
}
