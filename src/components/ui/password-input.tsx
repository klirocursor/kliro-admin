import { Input, InputProps } from "antd";
import { forwardRef } from "react";
import styled from "styled-components";

interface PasswordInputProps extends InputProps {
  clssName?: string;
}

export const PasswordInput = forwardRef<any, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <CustomInput {...props} ref={ref} className={`w-full ${className}`} />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

const CustomInput = styled(Input.Password)`
  background-color: #f7f7f7 !important;
  padding: 8px 16px !important;
  color: #0d0d0d !important;
  ::placeholder {
    color: #696969 !important;
  }
  .ant-input {
    &:disabled {
      color: #000 !important;
    }
  }
`;
