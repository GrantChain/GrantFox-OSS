import { LoginForm } from "@/features/auth/LoginForm";
import Image from "next/image";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

type AuthViewProps = {
  variant?: "login" | "reset" | "forgot";
};

export const AuthView = ({ variant = "login" }: AuthViewProps) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center justify-end gap-2">
          <AnimatedThemeToggler />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <>
              <h1 className="text-2xl font-bold">
                {variant === "login"
                  ? "Login"
                  : variant === "reset"
                    ? "Reset Password"
                    : "Forgot Password"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {variant === "login"
                  ? "Enter your email and password to login to your account"
                  : variant === "reset"
                    ? "Enter your new password"
                    : "Enter your email to reset your password"}
              </p>

              <div className="mt-6">
                {variant === "login" && <LoginForm />}
                {variant === "reset" && <ResetPasswordForm />}
                {variant === "forgot" && <ForgotPasswordForm />}
              </div>
            </>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden sm:flex items-center justify-center p-10">
        <div className="relative w-full max-w-2xl aspect-square">
          <Image
            src="/assets/grantfox-stellar-light.svg"
            alt="GrantFox Logo"
            fill
            priority
            className="dark:hidden object-contain"
          />
          <Image
            src="/assets/grantfox-stellar-dark.svg"
            alt="GrantFox Logo"
            fill
            priority
            className="hidden dark:block object-contain"
          />
        </div>
      </div>
    </div>
  );
};
