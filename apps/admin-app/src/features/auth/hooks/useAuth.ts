"use client";

import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { loginSchema } from "../schemas/auth.schema";
import { AuthService } from "../services/auth.service";
import { http } from "@/lib/http";
import { UserRole } from "@/types/user.type";

export const useAuth = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authService = new AuthService(http);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleLogin = async (payload: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

      const user = await authService.getUser(data?.session?.user?.id ?? "");

      if (!user) {
        await authService.register({
          user_id: data?.session?.user?.id ?? "",
          email: payload.email,
          username: payload.email.split("@")[0],
          avatar_url: data?.session?.user?.user_metadata?.avatar_url ?? "",
          role: UserRole.ADMIN,
        });
      }

      if (error && error.status === 400) {
        toast.error(error.message);
      }

      if (data?.session && !error) router.push("/dashboard/projects");
    } catch (error) {
      if (error) console.error(error);
      toast.error("Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign out");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    showPassword,
    setShowPassword,
    handleLogin,
    handleLogout,
    isLoading,
  };
};
