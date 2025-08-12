"use client";

import { JSX } from "react";
import { cn } from "@/utils/helper";
import styled from "styled-components";
import { useTheme } from "@/hooks/useTheme";

export const SectionHeading = ({
  className,
  children,
  tag = "h2",
}: {
  className?: string;
  children: React.ReactNode;
  tag?: keyof JSX.IntrinsicElements;
  [key: string]: any;
}) => {
  const { theme: isDark } = useTheme();
  const Tag = tag as keyof JSX.IntrinsicElements;
  return (
    <StyledSectionHeading $isDark={isDark}>
      <Tag
        className={cn(
          "heading-tag pb-6 text-[28px] leading-8 font-bold",
          className
        )}
      >
        {children}
      </Tag>
    </StyledSectionHeading>
  );
};

const StyledSectionHeading = styled.div<{ $isDark: boolean }>`
  .heading-tag {
    color: ${({ $isDark }) =>
      $isDark ? "#fff !important" : "#333 !important"};
    font-weight: 600;
    padding-bottom: 10px;
    margin-bottom: 20px;
    position: relative;
  }

  .heading-tag::before {
    position: absolute;
    content: "";
    background: ${({ $isDark }) => ($isDark ? "#fff" : "#004ed1")};
    border-radius: 3px;
    width: 64px;
    height: 3px;
    bottom: 0;
    left: 0;
  }
`;
