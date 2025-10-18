import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { SidebarTrigger } from "../ui/sidebar";

export const Header = () => {
  return (
    <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-10 justify-between sm:justify-end">
      <SidebarTrigger className="ml-1 block sm:hidden" />
      <AnimatedThemeToggler />
    </header>
  );
};
