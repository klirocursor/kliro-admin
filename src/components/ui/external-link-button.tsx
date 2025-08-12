"use client";

import { ExternalLink } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/helper";

interface ExternalLinkButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const ExternalLinkButton = ({
  href = "#",
  children,
  className,
  disabled = false,
}: ExternalLinkButtonProps) => {
  const { theme } = useTheme();

  const baseClasses = cn(
    "inline-flex items-center justify-center w-full gap-2 sm:gap-3 font-medium rounded-lg px-4 sm:px-6 py-2 sm:py-3 transition-colors text-sm sm:text-base",
    theme
      ? "bg-gray-700 text-white hover:bg-gray-600"
      : "bg-[#004ed1] text-white hover:bg-[#004ed1]/90",
    disabled &&
      "cursor-not-allowed opacity-50 hover:bg-gray-700 hover:bg-[#004ed1]",
    className,
  );

  if (disabled || !href || href === "#") {
    return (
      <div className={baseClasses}>
        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
        {children}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={baseClasses}
    >
      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
      {children}
    </a>
  );
};
