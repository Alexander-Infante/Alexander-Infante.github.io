import { Mail } from "lucide-react";
import { site } from "@/lib/data";
import { FloatingDock } from "@/components/ui/floating-dock";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

export function SocialDock({ className }: { className?: string }) {
  return (
    <FloatingDock
      className={className}
      items={[
        { title: "GitHub", href: site.github, external: true, icon: <GitHubIcon className="h-full w-full" /> },
        { title: "LinkedIn", href: site.linkedin, external: true, icon: <LinkedInIcon className="h-full w-full" /> },
        { title: "Email", href: `mailto:${site.email}`, icon: <Mail className="h-full w-full" /> },
      ]}
    />
  );
}
