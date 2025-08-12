"use client";

import { cn } from "@/utils/helper";
import { Button, ButtonProps } from "antd";
import { forwardRef, HTMLProps, useEffect, useState } from "react";
import styled from "styled-components";

interface FilledButtonProps extends ButtonProps {
  children?: React.ReactNode;
  className?: HTMLProps<HTMLElement>["className"];
  bgColor?: string;
}

export const FilledButton = forwardRef<HTMLButtonElement, FilledButtonProps>(
  ({ children, className, bgColor, ...props }, ref) => {
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by only rendering styled component after mount
    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) {
      return (
        <Button
          ref={ref}
          type="primary"
          className={cn("w-full rounded-[6px] p-6", className)}
          style={{
            background: bgColor || "#004ed1",
            color: "white",
            border: "none",
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "24px",
            boxShadow: "none",
          }}
          {...props}
        >
          {children}
        </Button>
      );
    }

    return (
      <CustomFilledButton
        ref={ref}
        type="primary"
        className={cn("w-full rounded-[6px] p-6", className)}
        $bgColor={bgColor}
        {...props}
      >
        {children}
      </CustomFilledButton>
    );
  },
);

FilledButton.displayName = "FilledButton";

export const CustomFilledButton = styled(Button)<{ $bgColor?: string }>`
  background: ${(props) => props.$bgColor || "#004ed1"} !important;
  color: white !important;
  border: none !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  line-height: 24px !important;
  box-shadow: none !important;

  &:hover {
    background: ${(props) => `${props.$bgColor}dd` || "#004ed1dd"} !important;
  }
`;
