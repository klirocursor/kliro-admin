import { Select, SelectProps } from "antd";
import styled from "styled-components";

export const CustomSelect: React.FC<SelectProps> = ({ ...props }) => {
  return <ExtendedSelect {...props} />;
};

const ExtendedSelect = styled(Select)`
  width: 100% !important;
  .ant-select-selector {
    padding: 16px !important;
    height: auto !important;
  }

  .ant-select-selection-item {
    line-height: 24px !important;
  }
`;
