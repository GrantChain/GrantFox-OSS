import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "Website", href: "http://grantfox.xyz/" },
    { label: "Docs", href: "https://docs.grantfox.xyz/" },
  ];

  const socials = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/grantfox",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://x.com/itsgrantfox",
      label: "X (Twitter)",
    },
  ];

  return (
    <footer className="relative border-t border-border bg-background text-foreground mt-10">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/favicon.ico"
                alt="GrantFox Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <h3 className="text-xl font-bold tracking-tight">GrantFox</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Open-source collaboration hub on the Stellar ecosystem. For the
              community, by the community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold">Resources</h4>
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex flex-col gap-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground w-fit"
                  >
                    <Icon size={16} />
                    {social.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-end justify-end opacity-70 dark:opacity-70">
            <Image
              src="/assets/grantfox-stellar-light.svg"
              alt="GrantFox Logo"
              width={80}
              height={80}
              className="dark:hidden"
              priority
            />
            {/* Dark theme logo */}
            <Image
              src="/assets/grantfox-stellar-dark.svg"
              alt="GrantFox Logo"
              width={80}
              height={80}
              className="hidden dark:block"
              priority
            />
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-border" />

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {currentYear} GrantFox. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ for the Stellar community | From Latam
          </p>
        </div>
      </div>
    </footer>
  );
};
