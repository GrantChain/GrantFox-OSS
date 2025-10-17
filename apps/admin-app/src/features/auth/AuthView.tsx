import { LoginForm } from "@/features/auth/LoginForm";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export const AuthView = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center justify-between gap-2">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
          <AnimatedThemeToggler />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
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
