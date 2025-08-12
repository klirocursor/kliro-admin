import { type InputProps } from "antd";
import Input from "antd/es/input/Input";
import { forwardRef, useMemo } from "react";
import { InputSuffixLoading } from "@/components/ui/suffix-loading";
import { cn } from "@/utils/helper";
import styled from "styled-components";

interface DefaultInputProps extends InputProps {
  className?: string;
  hideSuffix?: boolean;
  suffixComp?: React.ReactNode;
  loading?: boolean;
}

export const DefaultInput = forwardRef<any, DefaultInputProps>(
  (
    { className, hideSuffix, suffixComp, suffix, loading = false, ...props },
    ref
  ) => {
    const load = useMemo(
      () => (suffix ? suffix : <InputSuffixLoading isLoading={loading} />),
      [suffix, loading]
    );
    return (
      <div className="relative">
        <CustomInput
          type="text"
          {...props}
          ref={ref}
          className={cn("w-full", className)}
          suffix={hideSuffix ? null : load}
        />
        <div className="absolute top-[2px] right-2">{suffixComp}</div>
      </div>
    );
  }
);

DefaultInput.displayName = "DefaultInput";

const CustomInput = styled(Input)`
  background-color: #f7f7f7 !important;
  padding: 8px 16px !important;
  color: #0d0d0d !important;
  ::placeholder {
    color: #a3a3a3 !important;
    opacity: 1 !important;
  }
  .ant-input {
    &:disabled {
      color: #000 !important;
    }
  }
`;
